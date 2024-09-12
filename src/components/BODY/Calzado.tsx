import React from 'react'
interface CalzadoProps {
  selectedIndex: number; // Especifica el tipo de selectedIndex
}
const Calzado: React.FC<CalzadoProps>  = ({selectedIndex}) => {
  return (
    <div>Calzado</div>
  )
}

export default Calzado