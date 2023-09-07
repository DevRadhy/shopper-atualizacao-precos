import { ChangeEvent, useState } from "react";
import api from "./providers/api";

type ProductData = {
  code: string;
  name: string;
  price: number;
  new_price: number;
  errors: string[] | null;
}

function App() {
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<ProductData[]>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);

      console.log(e.target.files[0])
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/validate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    setData(data);
  };

  const moneyFormat = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    
  return (
    <div className="bg-gray-800 w-full min-h-screen flex justify-center">
      <div className="w-[90%] max-w-lg mt-48">
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique para carregar</span> ou arraste e solte</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">aquivo CSV</p>
                    { file && <p className="text-xs text-gray-500 dark:text-gray-400">{file?.name}</p> }
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
            </label>
        </div>

        <button type="button" onClick={handleUploadClick} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Validar</button>
      
        { data && <h2 className="mt-6 text-white text-xl font-bold">Produtos</h2> }
        { data && data.map((product: ProductData, index: number) => (
          <div className="m-4" key={product.code + index}>
            <ul className="text-gray-50 text-sm bg-gray-700 rounded-md p-4">
              <li><strong>Nome: </strong>{product.name}</li>
              <li><strong>Código: </strong>{product.code}</li>
              <li><strong>Preço atual: </strong>{moneyFormat(product.price)}</li>
              <li><strong>Novo preço: </strong>{moneyFormat(product.new_price)}</li>
            </ul>
            
              { product.errors && 
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  { product.errors.map((error: string, index: number) => (
                    <li key={product.code + index} className="text-red-500">
                        {error}
                    </li>
                  ))}
                </ul>
              }
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
