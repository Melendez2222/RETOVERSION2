import { CategoriaProps } from "./Interfaces";

const Categoria: React.FC<CategoriaProps> = ({ onSelectCategory }) => {
  const data = [
    { cateImg: "./src/assets/category/cat1.png", cateName: "CAMISA" },
    { cateImg: "./src/assets/category/cat2.png", cateName: "PANTALON" },
    { cateImg: "./src/assets/category/cat3.png", cateName: "CALZADO" },
    { cateImg: "./src/assets/category/cat4.png", cateName: "ASEO_PERSONAL" },
    { cateImg: "./src/assets/category/cat5.png", cateName: "LIMPIEZA" },
  ];

  return (
    <div className='category'>
      {data.map((value, index) => (
        <div
          className='box f_flex'
          key={index}
          onClick={() => onSelectCategory(value.cateName, index     + 1)}
          
        >
          <img src={value.cateImg} alt={value.cateName} />
          <span>{value.cateName}</span>
        </div>
      ))}
    </div>
  );
};

export default Categoria;
