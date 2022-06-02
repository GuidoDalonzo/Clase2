import fs from "fs";

class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }

  save = async (product) => {
    try {
      const allProducts = await this.read();

      const lastProductId = allProducts[allProducts.length - 1].id;

      const newProduct = {
        id: lastProductId + 1,
        ...product,
      };

      await fs.promises.writeFile(
        this.filename,
        JSON.stringify([...allProducts, newProduct])
      );

      return newProduct.id;
    } catch (error) {
      throw new Error(error);
    }
  };

  read = async () => {
    try {
      const data = await fs.promises.readFile(this.filename, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  async getById ( idNumber )
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( jsonFile, 'utf8' ) )
      this.productosArray = data;
      const producto = this.productosArray.find( ( producto ) => producto.id === idNumber )
      if ( producto ) console.log( producto )
      else console.log( 'No se encontro el producto' )
    } catch ( err ) {
      console.log( err )
    }

  }

  async getAll ()
  {
    const data = await fs.promises.readFile( jsonFile )
    const productos = JSON.parse( data )
    if ( productos.length ) {
      const todosLosProductos = productos.map( ( producto ) => producto )
      console.log( todosLosProductos )
    } else {
      console.log( 'No hay productos' )
    }
  }

  async deleteById ( idNumber )
  {
    try {
      const data = await fs.promises.readFile( jsonFile )
      this.productosArray = JSON.parse( data )

      const newData = this.productosArray.findIndex( ( producto ) => producto.id === idNumber ? true : false )
      if ( newData !== -1 ) {
        this.productosArray.splice( newData, 1 )
        this.write( this.productosArray )
        console.log( 'Producto borrado' )
      } else {
        console.log( 'No se encontro el producto' )
      }

    } catch ( err ) {
      console.log( err )
    }

  }

  async deleteAll ()
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( jsonFile, 'utf8' ) )
      if ( data.length ) {
        this.write( [] )
        console.log( 'Todos los archivos fueron borrados ' )
      } else {
        console.log( 'No hay productos para borrar' )
      }

    } catch ( err ) {
      console.log( err )
    }
  }

}




const productos = new Contenedor("./products.json");

productos.save({
  title: "testing",
  price: 100,
  thumbnail: "http://http2.mlstatic.com/D_875724-MLA31116238699_062019-O.jpg",
});
