import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { chevronBack, add } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const QrCodeResult: React.FC = () => {
  const history = useHistory();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [selectedShippingCost, setSelectedShippingCost] = useState<number | null>(null);
  const [insuranceSelected, setInsuranceSelected] = useState(false);

  // Gestione indirizzi
  const [addresses, setAddresses] = useState<{ id: number; label: string }[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nome: "", via: "", citta: "", cap: "" });

  // Stato bottom sheet
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const products = [
    {
      id: 1,
      name: "Tazza turistica",
      supplier: "Da pasquale",
      price: 32.0,
      image: "Img. tazza turistica X.svg",
    },
    {
      id: 2,
      name: "Tazza artistica",
      supplier: "Arte & Co",
      price: 28.5,
      image: "Img. tazza turistica X.svg",
    },
  ];

  const selectedProductData = products.find((p) => p.id === selectedProduct);

  const shippingOptions = [
    { id: 1, label: "Spedizione Standard", info: "3 - 5 giorni lavorativi", cost: 0 },
    { id: 2, label: "Spedizione Express", info: "3 - 5 giorni lavorativi", cost: 9 },
    { id: 3, label: "Spedizione Personalizzata", info: "3 - 5 giorni lavorativi", cost: 15 },
  ];

  const insuranceCost = 5.75;

  // Salva indirizzo
  const handleAddAddress = () => {
    if (!formData.nome || !formData.via || !formData.citta || !formData.cap) return;

    const newAddress = {
      id: Date.now(),
      label: `${formData.nome}, ${formData.via}, ${formData.citta}, ${formData.cap}`,
    };
    setAddresses([...addresses, newAddress]);
    setFormData({ nome: "", via: "", citta: "", cap: "" });
    setShowForm(false);
  };

  // Funzione per aggiornare i campi del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Funzione per confermare il nuovo indirizzo
  const handleSubmit = () => {
    handleAddAddress(); // usa già la logica che hai scritto sopra
  };

  // Calcolo totale
  const total =
    selectedProductData && selectedShippingCost !== null
      ? (
          selectedProductData.price +
          selectedShippingCost +
          (insuranceSelected ? insuranceCost : 0)
        ).toFixed(2)
      : null;

  return (
    <IonPage>
      <IonContent className="p-4 bg-white flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-center mb-4 mt-10">
          <IonButton
            className="ml-[-75px]"
            fill="clear"
            onClick={() => history.goBack()}
          >
            <IonIcon icon={chevronBack} className="text-black" />
          </IonButton>
          <h2 className="text-lg font-semibold ml-2">Select your product</h2>
        </div>

        {/* Lista prodotti */}
        <div className="space-y-4 flex-1 flex flex-col items-center justify-center">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product.id);
                setShowShippingOptions(false);
                setSelectedShippingCost(null);
              }}
              className={`flex items-center w-80 h-20 p-3 px-16 rounded-lg cursor-pointer transition-colors duration-200
                ${
                  selectedProduct === product.id
                    ? "bg-green-100 border border-green-500"
                    : "bg-transparent border border-transparent"
                }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="ml-3">
                <p className="font-light text-amber-800 text-[17px]">{product.name}</p>
                <p className="text-sm text-gray-500 text-[12px]">{product.supplier}</p>
                <p className="text-base font-medium text-black text-[16px]">
                  € {product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Pulsanti extra */}
          <div className="flex flex-col gap-5 items-center justify-center">
            <div className="w-80 py-3 flex justify-center border-[3px] border-dashed border-[#E2E8F0] rounded-lg text-gray-600 font-medium">
              <IonIcon icon={add} className="mr-2" />
              Aggiungi prodotto al carrello
            </div>

            <div className="w-80 py-3 flex justify-center border-[3px] border-dashed border-[#E2E8F0] rounded-lg text-gray-600 font-medium">
              <IonIcon icon={add} className="mr-2" />
              Altro prodotto
            </div>
          </div>
        </div>

        {/* Bottone continua */}
        <div className="flex items-center justify-center">
          <IonButton
            shape="round"
            className={`mt-6 rounded-full w-72 transition-colors duration-200
              ${
                selectedProduct === null
                  ? "bg-green-300 text-white"
                  : "bg-green-500 text-white"
              }`}
            disabled={selectedProduct === null}
            onClick={() => setShowShippingOptions(true)}
          >
            Continua
          </IonButton>
        </div>

        {/* Overlay opzioni spedizione fullscreen */}
        {showShippingOptions && selectedProductData && (
          <div className="fixed inset-0 bg-white z-50 p-6 overflow-auto flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-center mb-4 mt-4">
              <IonButton
                className="ml-[-120px]"
                fill="clear"
                onClick={() => setShowShippingOptions(false)}
              >
                <IonIcon icon={chevronBack} className="text-black" />
              </IonButton>
              <h2 className="text-lg font-semibold ml-2">Dati spedizione</h2>
            </div>

            <p className="font-bold text-[18px]">Seleziona indirizzo</p>

            <div className="flex justify-between  gap-4 rounded-xl px-2 py-2 border-2 mb-4 mt-4">
              <div className="border-2 border-[#00C2A8] bg-[#F5FCFB] rounded-xl w-36 h-16">
                <div className="flex justify-center items-center flex-col mt-2.5">
                  <img className="" src="home.svg" alt="" />
                  <span className="">Indirizzi</span>
                </div>
              </div>
              <div className="border-2 border-[#00C2A8] rounded-xl w-36 h-16">
                <div className="flex justify-center items-center flex-col mt-2">
                  <div className="absolute w-20 h-auto p-2 pl-3 bg-[#F5FCFB] opacity-55 rounded-full"></div>
                  <span className="absolute bg-transparent">In arrivo</span>
                  <img src="User icon.svg" alt="" />
                  <span style={{ color: "#CCCED1" }} className="flex justify-center items-center">
                    Amici
                  </span>
                </div>
              </div>
            </div>

            <p className="font-medium text-[15px]">Seleziona indirizzo</p>

            {/* Lista indirizzi + aggiungi */}
            <div className="flex flex-col justify-center items-center gap-4 rounded-xl px-2 py-2 border-2 mb-4 mt-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`w-64 py-3 px-2 cursor-pointer rounded-lg text-center font-medium transition ${
                    selectedAddress === addr.id
                      ? "bg-green-100 border border-green-500 text-green-700"
                      : "bg-gray-100 border border-gray-300 text-gray-600"
                  }`}
                >
                  {addr.label}
                </div>
              ))}

              <div
                onClick={() => setShowForm(true)}
                className="w-64 py-3 flex justify-center border-[3px] border-dashed border-[#E2E8F0] rounded-lg cursor-pointer text-gray-600 font-medium"
              >
                <IonIcon icon={add} className="mr-2" />
                Aggiungi nuovo indirizzo
              </div>
            </div>

            <p className="font-bold text-[18px]">Tipo di spedizione</p>

            <div className="flex flex-col gap-4 rounded-xl px-2 py-2 border-2 mt-4">
              {shippingOptions.map((option) => {
                const isSelected = selectedShippingCost === option.cost;
                return (
                  <IonButton
                    fill="clear"
                    size="small"
                    key={option.id}
                    onClick={() => setSelectedShippingCost(option.cost)}
                    className={`w-full py-1 rounded-lg border font-semibold transition text-left justify-start
                      ${
                        isSelected
                          ? "bg-[#F5FCFB] border-[#00C2A8] border-2"
                          : "bg-transparent border-2 border-transparent hover:bg-gray-200"
                      }`}
                  >
                    <div className="flex flex-col gap-2 py-2 w-full">
                      <p
                        className={`font-bold text-[15px] flex justify-between pr-6 ${
                          isSelected ? "text-[#00C2A8]" : "text-black"
                        }`}
                      >
                        <p>{option.label}</p>
                        <p>{option.cost === 0 ? "Gratis" : `€ ${option.cost}`}</p>
                      </p>
                      <p className="text-gray-700 font-light">{option.info}</p>
                    </div>
                  </IonButton>
                );
              })}
            </div>

            {/* Pulsante assicurazione */}
            <div className="mt-4">
              <IonButton
                fill="clear"
                size="small"
                onClick={() => setInsuranceSelected(!insuranceSelected)}
                className={`w-full py-1 rounded-lg border font-semibold transition text-left justify-start
                  ${
                    insuranceSelected
                      ? "bg-[#F5FCFB] border-[#00C2A8] border-2"
                      : "bg-transparent border-2 hover:bg-gray-200"
                  }`}
              >
                <div className="flex flex-col gap-2 py-2 w-full">
                  <p
                    className={`font-bold text-[15px] flex justify-between pr-6 ${
                      insuranceSelected ? "text-[#00C2A8]" : "text-black"
                    }`}
                  >
                    <p>Proteggi il tuo acquisto</p>
                    <p>€ {insuranceCost.toFixed(2)}</p>
                  </p>
                  <p className="text-black font-light">Assicurazione danni e perdita</p>
                </div>
              </IonButton>
            </div>

            {/* Prezzo totale */}
            {selectedShippingCost !== null && (
              <div
                className="mt-8 px-5 py-3 rounded-xl text-white text-center flex flex-col items-center font-bold text-xl bg-[#00C2A8]"
                onClick={() => setShowBottomSheet(true)}
              >
                <div className="w-full flex justify-between">
                <p>Totale</p>
                <p>€ {total}</p>
                </div>
                <div className="mt-4 w-full flex justify-center">
                  <IonButton className="w-[100%] bg-[white] rounded-full " fill="clear"><span className="text-[19px]">Continua</span></IonButton>
                   </div>
              </div>
              
            )}
          
          </div>
        )}

        {/* Overlay fullscreen per il form indirizzo */}
        {showForm && (
          <div className="fixed inset-0 bg-white z-50 p-6 overflow-auto flex flex-col">
            <div className="flex items-center justify-center mb-4 mt-4">
              <IonButton className="ml-[-120px]" fill="clear" onClick={() => setShowForm(false)}>
                <IonIcon icon={chevronBack} className="text-black" />
              </IonButton>
              <h2 className="text-lg font-semibold ml-2">Nuovo indirizzo</h2>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <input
                type="text"
                name="nome"
                placeholder="Nome (es. Casa, Ufficio)"
                value={formData.nome}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="via"
                placeholder="Via e numero civico"
                value={formData.via}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  name="citta"
                  placeholder="Città"
                  value={formData.citta}
                  onChange={handleChange}
                  className="border p-2 rounded-lg flex-1"
                />
                <input
                  type="text"
                  name="cap"
                  placeholder="CAP"
                  value={formData.cap}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-24"
                />
              </div>

              <div className="flex gap-2 mt-6">
                <IonButton
                shape="round"
                size="default"
                  onClick={handleSubmit}
                  className=""
                >
                  <span style={{color:"white"}} className="font-semibold">Conferma indirizzo</span>
                </IonButton>
                <IonButton
                fill="clear"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border-[2px]  h-4 rounded-full border-red-700 py-2  "
                >
                  <span style={{color:"black"}} className="font-semibold mt-[-20px] text-black">Annulla</span>
                </IonButton>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Sheet */}
        <IonModal 
          isOpen={showBottomSheet}
          onDidDismiss={() => setShowBottomSheet(false)}
          initialBreakpoint={0.4}
          breakpoints={[0, 0.4, 0.8, 1]}

        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Riepilogo ordine</h2>

            {selectedProductData && (
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedProductData.image}
                  alt={selectedProductData.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <p className="font-bold">{selectedProductData.name}</p>
                  <p className="text-gray-500">€ {selectedProductData.price.toFixed(2)}</p>
                </div>
              </div>
            )}

            <div className="mb-3">
              <p className="font-semibold">Tipo di spedizione</p>
              <p className="text-gray-600">
                {
                  shippingOptions.find((s) => s.cost === selectedShippingCost)?.label
                }
              </p>
            </div>

            <div className="mb-3">
              <p className="font-semibold">Assicurazione</p>
              <p className="text-gray-600">
                {insuranceSelected
                  ? `Sì (+€ ${insuranceCost.toFixed(2)})`
                  : "No"}
              </p>
            </div>

            <div className="mt-6 flex justify-between font-bold text-lg border-t pt-3">
              <p>Totale</p>
              <p>€ {total}</p>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default QrCodeResult;
