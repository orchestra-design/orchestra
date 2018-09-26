import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { pick } from '../../helpers'

const G = styled('g')`
  fill: ${props => (!props.isMenu ? props.theme.logoFill : '#ffffff')};
  filter: ${props =>
    !props.isMenu && props.theme.logoShadow ? 'url(#shadow)' : null};
`

export const Logo = connect(pick(['isMenu']))(({ isMenu }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 321 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G {...{ isMenu }}>
      <path
        d="M11.8688 63.9753C4.26708 63.9876 0.0185257 60.0046 0 51.7484V12.2455C0 4.19915 4.21768 0 11.9182 0C19.6187 0 23.8549 4.19915 23.8549 12.2269L23.8364 51.7484C23.8302 59.7761 19.6434 63.9629 11.8688 63.9753ZM11.9182 55.8178C13.4682 55.8178 14.2648 54.8174 14.2648 52.9834V10.9919C14.2648 9.1208 13.4496 8.09571 11.9182 8.09571C10.3867 8.09571 9.57159 9.1208 9.57159 10.9919V52.9834C9.57159 54.8113 10.3682 55.8117 11.9182 55.8178Z"
        transform="translate(24 24.0186)"
      />
      <path
        d="M0 61.7399L0.0247005 0H12.8939C20.4956 0 23.6511 6.70012 23.7437 16.2161L23.7808 20.5697C23.7684 23.5029 23.3609 28.1899 18.643 31.8209V32.0371C22.1073 34.2663 22.9101 41.1702 22.8421 41.8557L23.1077 55.4473C23.1941 58.1582 23.4844 59.7082 24.2007 61.7399H14.3636C14.0486 60.7333 13.746 58.9795 13.6843 57.8618L13.3941 43.3624C13.215 40.8059 12.6098 36.7426 11.3007 36.7426H9.54689L9.52219 61.7399H0ZM11.3007 27.7823C13.6905 27.7823 14.345 20.1497 14.345 17.7229C14.345 14.5735 13.2397 8.423 11.3068 8.423H9.56542L9.57159 27.7885L11.3007 27.7823Z"
        transform="translate(53.9502 25.1113)"
      />
      <path
        d="M0 61.7769V0H9.5222V44.4307H15.0861V0H24.6083V61.7646H15.0861V53.2057H9.5222V61.7769H0Z"
        transform="translate(111.54 25.1299)"
      />
      <path
        d="M0 61.7769V0H19.2605V8.3736H9.63335V25.4913H17.7661V34.2663H9.63335V53.2304H19.4767V61.7769H0Z"
        transform="translate(142.145 25.1299)"
      />
      <path
        d="M12.7767 8.13277C15.3023 8.11424 15.8519 12.0417 15.8457 15.6604C15.8396 18.0069 15.5802 20.2362 15.3888 21.1995L22.6941 21.8418C23.0708 19.3964 23.219 14.3142 23.219 12.4369C23.219 5.05133 20.7057 0 12.931 0C5.35405 0 0.883185 4.73639 0.870834 12.863C0.858484 21.0081 5.4158 31.2343 9.87431 37.7677C11.5725 40.2563 13.0545 43.0042 13.0484 49.7723C13.0422 54.2123 12.4061 55.8055 10.6215 55.8117C8.71336 55.824 7.23749 53.8232 7.26219 48.5619C7.27454 45.8448 7.6574 43.3686 7.93528 41.9792L0.605297 41.516C0.222433 43.9614 -0.00605316 46.0919 0.000122061 48.5558C0.00629728 56.0895 2.01943 63.9876 10.7512 63.9876C19.0075 63.9876 22.9287 59.0845 22.9164 49.1609C22.904 40.4045 19.8349 33.4944 14.7898 25.7445C12.0418 21.5268 10.461 18.433 10.461 12.5233C10.461 10.4299 10.6586 8.13277 12.7767 8.13277Z"
        transform="translate(165.252 24)"
      />
      <path
        d="M0 8.45388V0H24.6083V8.45388H17.0127V61.8448H7.38556V8.45388H0Z"
        transform="translate(191.787 25.0498)"
      />
      <path
        d="M7.16326 0H17.5747L24.9294 61.8016H15.2713L14.413 53.3107L8.84908 53.286L7.99073 61.8016H0L7.16326 0ZM11.7947 20.2733L9.57159 44.5419L13.8263 44.511L11.7947 20.2733Z"
        transform="translate(249.494 25.0498)"
      />
      <path
        d="M0 8.55886V0H8.34891V8.55886H0Z"
        transform="translate(288.3 69.5605)"
      />
      <path
        d="M0 61.7399L0.0246949 0H12.8939C20.4956 0 23.6511 6.70012 23.7437 16.2161L23.7808 20.5697C23.7684 23.5029 23.3609 28.1899 18.643 31.8209V32.0371C22.1073 34.2663 22.9101 41.1702 22.8421 41.8557L23.1077 55.4473C23.1941 58.1582 23.4844 59.7082 24.2007 61.7399H14.3697C14.0548 60.7333 13.7522 58.9795 13.6905 57.8618L13.4002 43.3624C13.2211 40.8059 12.616 36.7426 11.3068 36.7426H9.55306L9.52837 61.7399H0ZM11.3007 27.7823C13.6905 27.7823 14.345 20.1497 14.345 17.7229C14.345 14.5735 13.2397 8.423 11.3068 8.423H9.56541L9.57159 27.7885L11.3007 27.7823Z"
        transform="translate(221.101 25.1113)"
      />
      <path
        d="M0 51.6866V12.2208C0 3.65577 3.44577 0.0123856 11.6588 3.5195e-05C19.4087 -0.0123152 22.2308 3.2235 22.2493 13.3385C22.2555 16.2841 22.0208 18.8962 21.8109 21.7924L14.5488 21.1502C14.7341 20.1868 14.9996 17.9576 15.0058 15.611C15.012 11.9923 14.4006 8.07105 11.9367 8.0834C10.4299 8.08958 9.63334 9.66426 9.62717 11.0352L9.52837 52.8908C9.62717 54.3667 10.4608 55.8611 12.0046 55.8796C14.5797 55.9167 15.2466 52.4771 15.2528 48.9325C15.259 46.166 14.8391 43.3624 14.5673 41.973L21.8356 41.3678C22.237 43.5107 22.4593 45.8634 22.4593 48.3397C22.4655 58.6029 18.7418 63.9815 11.7514 63.9815C4.35353 63.9753 0 59.418 0 51.6866Z"
        transform="translate(83.5107 24.0186)"
      />
    </G>
    <defs>
      <filter
        id="shadow"
        x="0"
        y="0"
        width="320.649"
        height="112"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="12" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
))
