import React from 'react'
interface PantalonProps {
  selectedIndex: number; // Especifica el tipo de selectedIndex
}
const Pantalon: React.FC<PantalonProps>  = ({selectedIndex}) => {
  return (
    <div>Pantalon</div>
  )
}

export default Pantalon