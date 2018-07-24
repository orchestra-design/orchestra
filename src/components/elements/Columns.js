///* global tw */
import React from 'react'
import { JustImage } from './JustImage'
//import styled, { css } from 'react-emotion'

export const Columns = ({ primary, items }) => {
  console.log(items)
  
  return (
    <div>
     <JustImage image={primary.colbackimage} />
    </div>
  )
}