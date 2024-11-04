import { useState, useRef } from 'react';
import Voucher from '../../Components/Voucher';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function Home() {
  const [bgColor, setBgColor] = useState('#4a90e2'); // Jemnější výchozí modrá barva
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [logoImageUrl, setLogoImageUrl] = useState<string | undefined>(undefined);
  const [voucherAmount, setVoucherAmount] = useState(200);
  const voucherRef = useRef<HTMLDivElement>(null);

  const handleAmountChange = (amount: number) => {
    setVoucherAmount(amount);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Funkce pro generování PDF
  const generatePDF = async () => {
    if (voucherRef.current) {
      // Vytvoří snímek voucheru pomocí html2canvas
      const canvas = await html2canvas(voucherRef.current);
      const imgData = canvas.toDataURL('image/png');

      // Inicializace jsPDF a přidání obrázku do PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('voucher.pdf'); // Název souboru
    }
  };

  return (
    <div className="bg-slate-200 w-full h-screen flex flex-col md:flex-row">
      {/* Panel nastavení */}
      <div className="w-full md:w-1/4 p-4 flex flex-col items-center text-gray-800">
        <h2 className="mb-4">Vyberte barvu pozadí voucheru</h2>
        <input
          type="color"
          value={bgColor}
          onChange={handleColorChange}
          className="w-16 h-16 cursor-pointer mb-4"
        />

        <h2 className="mb-4">Nahrajte obrázek pozadí</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer text-black mb-4"
        />

        <h2 className="mb-4">Nahrajte obrázek loga</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoImageChange}
          className="cursor-pointer text-black mb-4"
        />

        <h2 className="mt-8 mb-4">Vyberte částku poukazu</h2>
        <div className="flex flex-wrap justify-center space-x-2 mb-4">
          {[100, 200, 500, 1000].map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountChange(amount)}
              className={`px-4 py-2 rounded mb-2 ${
                voucherAmount === amount ? 'bg-yellow-400' : 'bg-gray-300 text-gray-800'
              }`}
            >
              {amount} Kč
            </button>
          ))}
        </div>

        {/* Tlačítko pro generování PDF */}
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Stáhnout jako PDF
        </button>
      </div>

      {/* Voucher komponenta */}
      <div className="flex flex-grow justify-center items-center p-4">
        <div ref={voucherRef}>
          <Voucher
            color={bgColor}
            imageUrl={imageUrl}
            logoImageUrl={logoImageUrl}
            amount={voucherAmount}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
