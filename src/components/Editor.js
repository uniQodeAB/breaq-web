import React from 'react';
import SearchBox from './SearchBox';

/* eslint-disable camelcase */
export const EditorSearchBox = ({ placeholder, addressCallback }) => (
  <SearchBox
    placeholder={placeholder}
    onChangePlace={(
      {
        street_number = { longName: '' },
        route = { longName: '' },
        postal_code = { longName: '' },
        postal_town = { longName: '' },
        administrative_area_level_1 = { longName: '' },
        country = { longName: '' }
      },
      geometry = { location: {} }
    ) => {
      addressCallback({
        address: {
          streetAddress: `${street_number.longName} ${route.longName}`,
          postalAddress: `${postal_code.longName} ${postal_town.longName}`,
          prefecture: administrative_area_level_1.longName,
          country: country.longName
        },
        location: {
          lat: geometry.location ? geometry.location.lat() : {},
          lng: geometry.location ? geometry.location.lng() : {}
        }
      });
    }}
  />
);

export const EditorButtons = ({
  isUpdate,
  onCancelUpdate,
  onUpdate,
  onCancelAdd,
  onAdd
}) => (
  <div className={'buttons'}>
    {isUpdate ? (
      <div>
        <button onClick={onCancelUpdate}>Cancel</button>
        <button className={'update'} onClick={onUpdate}>
          Update
        </button>
      </div>
    ) : (
      <div>
        <button onClick={onCancelAdd}>Cancel</button>
        <button className={'add'} onClick={onAdd}>
          Save
        </button>
      </div>
    )}
  </div>
);

export const EditorInput = ({ placeholder, value, onChange }) => (
  <input
    type={'text'}
    className={'form-input'}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);
