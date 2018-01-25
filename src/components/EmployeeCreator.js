import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchBox from './SearchBox';
import InfoBox, { icons } from './InfoBox';

import '../styles/CompanyCreator.css';

const initialState = {
  employee: {
    name: '',
    project: ''
  }
};
/* eslint-disable camelcase */
class EmployeeCreator extends Component {
  constructor(props) {
    super(props);

    const { employee, employeeId } = props;

    if (employee && employeeId) {
      this.state = {
        employee
      };
    } else {
      this.state = {
        ...initialState
      };
    }
  }

  render() {
    const {
      placeholders,
      firebase,
      auth,
      companyId,
      employeeId,
      endAddEmployee,
      endEditEmployee,
      color
    } = this.props;

    const { employee } = this.state;

    const createEmployee = () => {
      firebase
        .push(`/users/${auth.uid}/companies/${companyId}/employees/`, {
          ...employee
        })
        .then(() => {
          this.setState({
            ...initialState
          });
        })
        .then(() => endAddEmployee(companyId));
    };

    const updateEmployee = () => {
      firebase
        .ref(
          `/users/${auth.uid}/companies/${companyId}/employees/${employeeId}`
        )
        .update({
          ...employee
        })
        .then(() => {
          this.setState({
            ...initialState
          });
        })
        .then(() => endEditEmployee(companyId, employeeId));
    };

    return (
      <div className={'CompanyCreator'}>
        <input
          type={'text'}
          className={'form-input'}
          placeholder={placeholders.name}
          value={employee.name}
          onChange={e =>
            this.setState({
              employee: {
                ...employee,
                name: e.target.value
              }
            })
          }
        />

        <input
          type={'text'}
          className={'form-input'}
          placeholder={placeholders.project}
          value={employee.project}
          onChange={e =>
            this.setState({
              employee: {
                ...employee,
                project: e.target.value
              }
            })
          }
        />

        <SearchBox
          placeholder={placeholders.address}
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
            this.setState({
              employee: {
                ...employee,
                address: {
                  streetAddress: `${street_number.longName} ${route.longName}`,
                  postalAddress: `${postal_code.longName} ${
                    postal_town.longName
                  }`,
                  prefecture: administrative_area_level_1.longName,
                  country: country.longName
                },
                location: {
                  lat: geometry.location ? geometry.location.lat() : {},
                  lng: geometry.location ? geometry.location.lng() : {}
                }
              }
            });
          }}
        />
        {console.log(color)}
        <InfoBox
          title={employee.name}
          subTitle={employee.project}
          icon={icons.employee}
          address={employee.address}
          color={color}
        />

        <div className={'buttons'}>
          {employeeId ? (
            <div>
              <button onClick={() => endEditEmployee(companyId, employeeId)}>
                Cancel
              </button>
              <button className={'update'} onClick={updateEmployee}>
                Update
              </button>
            </div>
          ) : (
            <div>
              <button onClick={() => endAddEmployee(companyId)}>Cancel</button>
              <button className={'add'} onClick={createEmployee}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

EmployeeCreator.propTypes = {
  companyId: PropTypes.string.isRequired,
  employeeId: PropTypes.string,
  employee: PropTypes.shape({
    name: PropTypes.string,
    project: PropTypes.string,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      postalAddress: PropTypes.string,
      prefecture: PropTypes.string,
      country: PropTypes.string
    })
  }),
  placeholders: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    project: PropTypes.string
  }),
  firebase: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired,
  endAddEmployee: PropTypes.func.isRequired,
  endEditEmployee: PropTypes.func.isRequired
};

EmployeeCreator.defaultProps = {
  employeeId: undefined,
  employee: undefined,
  placeholders: {
    name: 'Name',
    address: 'Address',
    project: 'Project'
  }
};

export default EmployeeCreator;
