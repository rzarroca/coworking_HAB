const { getRegistrations, getConnection } = require('../../helpers/dbHelpers');

const getSpace = async (req, res, next) => {
	try {
		const { id } = req.query;

		let [results] = await getRegistrations('espacios', { id: `${id}` });
		const [centro] = await getRegistrations('centros', {
			id: results.id_centro,
		});
		let reserves = await getRegistrations('reservas', {
			id_espacio: `${id}`,
		});

		const services = await getRegistrations(
			`SELECT servicios.nombre, servicios.id FROM servicios INNER JOIN
			espacios_servicios ON servicios.id = espacios_servicios.id_servicio
			AND espacios_servicios.id_espacio = ${id} AND espacios_servicios.precio IS NULL;`
		);

		const extraServices = await getRegistrations(
			`SELECT servicios.nombre, servicios.id, espacios_servicios.precio FROM servicios INNER JOIN
				espacios_servicios ON servicios.id = espacios_servicios.id_servicio
				AND espacios_servicios.id_espacio = ${id} AND espacios_servicios.precio IS NOT NULL;`
		);

		const photos = await getRegistrations('imagenes', {
			id_espacio: `${id}`,
		});
		if (
			!req.auth ||
			req.auth.tipo !== 'administrador' ||
			centro.id_administrador !== req.auth.idAuth
		) {
			reserves = reserves.map((reserva) => {
				return {
					fecha_inicio: reserva.fecha_reserva,
					fecha_fin: reserva.fecha_fin,
				};
			});
			results = {
				...results,
				centro: centro,
				servicios: services,
				servicios_estra: extraServices,
				imagenes: photos,
				reserves,
			};
		} else {
			const incidencias = await getRegistrations(`SELECT incidencias.*
						FROM incidencias
						INNER JOIN 	reservas ON reservas.id = incidencias.id_reserva
						WHERE reservas.id_espacio = ${id};`);
			results = {
				...results,
				centro: centro,
				servicios: services,
				servicios_estra: extraServices,
				imagenes: photos,
				reserves,
				incidencias,
			};
		}

		console.log('Mostadro espacio requerido, Id:', id);
		res.status(200);
		res.send({
			status: 'ok',
			data: results,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = getSpace;