import AseoPersonal from './AseoPersonal';
import Calzado from './Calzado';
import Camisa from './Camisa';
import { useState } from 'react'
import Categoria from './Categoria'
import './Home.css'
import Limpieza from './Limpieza';
import Pantalon from './Pantalon';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const handleSelectCategory = (category:string) => {
        setSelectedCategory(category);
        // setSelectedIndex(index);
    };
    const renderCategoryComponent = () => {
        const validIndex = selectedIndex !== null ? selectedIndex : 0;
        switch (selectedCategory) {
          case 'CAMISA':
            return <Camisa/>;
          case 'PANTALON':
            return <Pantalon selectedIndex={validIndex}/>;
          case 'CALZADO':
            return <Calzado selectedIndex={validIndex}/>;
          case 'ASEO PERSONAL':
            return <AseoPersonal selectedIndex={validIndex}/>;
          case 'LIMPIEZA':
            return <Limpieza selectedIndex={validIndex}/>;
        //   default:
        //     return <SliderHome />;
        }
      };
    return (
        <>
            <section className='home'>
                <div className='container d_flex'>
                    <Categoria onSelectCategory={handleSelectCategory}/>
                    {renderCategoryComponent()}
                </div>
            </section>
        </>
    )
}

export default Home