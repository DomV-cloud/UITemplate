import AlzaImage from './Images/ImageAlza';

interface VoucherProps {
  color: string;
  imageUrl?: string;
  logoImageUrl?: string;
  amount: number;
}

function Voucher({ color, imageUrl, logoImageUrl, amount }: VoucherProps) {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div
        className="relative w-[500px] h-[250px] shadow-lg overflow-hidden rounded-lg p-4"
        style={{
          backgroundColor: color,
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Levý horní roh - Hodnota voucheru */}
        <div className="flex flex-col justify-center items-center h-full text-center">
        <div className="absolute top-4 left-4 text-3xl font-bold text-gray-700">
        {amount} <span className="text-sm">KORUN ČESKÝCH</span>
        </div>
          <div className="text-lg font-semibold text-gray-800">Dárkový poukaz</div>
          <div className="text-sm text-gray-600">na {amount} korun českých</div>
        </div>

        {/* Logo a název firmy vpravo */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div 
          className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: color,
            backgroundImage: logoImageUrl ? `url(${logoImageUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          {!logoImageUrl && <span className="text-xs">Vaše logo</span>}

          </div>
          <div className="text-sm font-bold text-gray-700">alza.cz</div>
        </div>

        {/* Střední text - Popis */}
        <div className="flex flex-col justify-center items-center h-full text-center">
          <div className="text-lg font-semibold text-gray-800">Dárkový poukaz</div>
          <div className="text-sm text-gray-600">na dvě stě korun českých</div>
        </div>

        {/* Pole pro kód voucheru - dole */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 border border-gray-300 rounded-md px-4 py-2 text-center text-gray-800 font-mono tracking-wider">
          KÓD: XXXXX-XXXXX
        </div>

        <AlzaImage />
      </div>
    </div>
  );
}

export default Voucher;
