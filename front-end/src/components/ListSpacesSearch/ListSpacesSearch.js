import './ListSpacesSearch.css';
import SpaceCard from '../SpaceCard/SpaceCard';
import descIcon from '../../assets/icons/bx-chevron-down.svg';
import calendarIcon from '../../assets/icons/bxs-calendar.svg';
import personIcon from '../../assets/icons/bxs-user.svg';
import priceIcon from '../../assets/icons/bxs-dollar-circle.svg';
import ascIcon from '../../assets/icons/bx-chevron-up.svg';
import OrderByNavigation from '../OrderByNavigation/OrderByNavigation';
import spaceTypeToPlural from '../../helpers/spaceTypeToPlural';
import spaceTyping from '../../helpers/spaceTyping';
import HelpPresentation from '../HelpPresentation/HelpPresentation';
import noCentersIllustration from '../../assets/illustrations/undraw_Traveling_re_weve.svg';

export default function ListSpacesSearch({
  results,
  searchObject,
  setSearchObject,
  className,
}) {
  let listSpaces = spaceTyping(results);

  const initialManagementCriteria = {
    state: 0,
    criterias: [
      {
        position: 0,
        icons: [
          [priceIcon, descIcon],
          [priceIcon, ascIcon],
        ],
        text: ['Precio descendente', 'Precio ascendente'],
        value: ['precio descendente', 'precio ascendente'],
      },
      {
        position: 0,
        icons: [
          [calendarIcon, descIcon],
          [calendarIcon, ascIcon],
        ],
        text: ['Reserva minima descendente', 'Reserva minima ascendente'],
        value: ['reserva_minima descendente', 'reserva_minima ascendente'],
      },
      {
        position: 0,
        icons: [
          [personIcon, descIcon],
          [personIcon, ascIcon],
        ],
        text: ['Capacidad descendente', 'Capacidad minima ascendente'],
        value: ['capacidad_maxima descendente', 'capacidad_maxima ascendente'],
      },
    ],
  };
  return (
    <article className={className + ' listSpaces'}>
      {setSearchObject ? (
        <OrderByNavigation
          searchObject={searchObject}
          setSearchObject={setSearchObject}
          initialManagementCriteria={initialManagementCriteria}
        />
      ) : (
        <div className="presentationStart" />
      )}
      {Object.keys(listSpaces).length > 0 ? (
        <ul>
          {Object.keys(listSpaces).map((type) => {
            return (
              <li key={type}>
                <h3 className="listSpacesType">{spaceTypeToPlural(type)}</h3>
                <ul>
                  {listSpaces[type].map((space) => (
                    <SpaceCard
                      key={space.id}
                      space={space}
                      searchObject={searchObject}
                      name={space.id}
                    />
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      ) : (
        <HelpPresentation
          className="mainSectionLeftArticle"
          image={noCentersIllustration}
          text="No existen espacios"
        />
      )}

      <div className="presentationEnd" />
    </article>
  );
}
