export enum Status {
    ACTIVE = 'ACTIVE', //e.g user status
    APPROVED= 'APPROVED',
    COMPLETED = 'COMPLETED', //e.g completed ride or kyc
    ACCEPTED = 'ACCEPTED', //e.g request to join a ride(although accepted by default)
    VERIFIED = 'VERIFIED', //e.g verify car, user, etc
    SUCCESS= 'SUCCESS',
    PENDING = 'PENDING',
    ONGOING = 'ONGOING', //e.g ongoing ride/trip
    WAITING = 'WAITING',
    INACTIVE= 'INACTIVE', //e.g unverified car
    RESTRICTED = 'RESTRICTED',//e.g restricted user, unapproved cars
    SUSPENDED = 'SUSPENDED',//e.g suspended user, ride, car etc
    CANCELLED = 'CANCELLED', //e.g cancelled ride
    BLOCKED = 'BLOCKED', //e.g blocked user, ride, car etc
  }