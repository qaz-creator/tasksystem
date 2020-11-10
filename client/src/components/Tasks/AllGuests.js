import React, { useContext, useEffect } from 'react'
import GuestContext from '../../context/TaskContext/GuestContext'
import Guest from './Guest'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AuthContext from '../../context/AuthContext/authContext'
/**
 * @author
 * @function AllGuests
 **/

const AllGuests = (props) => {
  const { loading } = useContext(AuthContext)

  const { guests, filterGuest, search, allGuests } = useContext(GuestContext)
  useEffect(() => {
    allGuests()
    // eslint-disable-next-line
  }, [])

  if (guests === null || guests.length === 0) {
    return (
      <h3 className="no-guest">
        {loading ? 'Loading guests...' : 'Please add a guest'}
      </h3>
    )
  }

  return (
    <TransitionGroup className="guests">
      {search !== null
        ? search.map((guest) => (
            <CSSTransition key={guest._id} timeout={300}>
              <Guest guest={guest} />
            </CSSTransition>
          ))
        : guests
            .filter((guest) => !filterGuest || guest.isconfirmed)
            .map((guest) => (
              <CSSTransition key={guest._id} timeout={300}>
                <Guest guest={guest} />
              </CSSTransition>
            ))}
    </TransitionGroup>
  )
}

export default AllGuests
