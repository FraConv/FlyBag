import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonModal,
  IonDatetime
} from "@ionic/react";
import { chevronBack, add } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const QrCodeResult: React.FC = () => {
  const history = useHistory();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [selectedShippingCost, setSelectedShippingCost] = useState<number | null>(null);
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [showPagamento, setShowPagamento] = useState(false);
  const [customDate, setCustomDate] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Gestione indirizzi
  const [addresses, setAddresses] = useState<{ id: number; label: string }[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nome: "", via: "", citta: "", cap: "" });

  
  // Gestione carte

  const [showFormCredit, setShowFormCredit] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [formDataCredit, setFormDataCredit] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [cards, setCards] = useState([])

  // Tutti i campi devono essere non vuoti
const isFormValid =
    formDataCredit.name.trim() &&
    formDataCredit.number.trim() &&
    formDataCredit.expiry.trim() &&
    formDataCredit.cvv.trim();

  const handleChangeCredit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataCredit({ ...formDataCredit, [e.target.name]: e.target.value });
  };

  const handleSubmitCredit = () => {
    if (!isFormValid) return;

    // Aggiungo la nuova carta a cards
    setCards([
      ...cards,
      {
        name: formDataCredit.name,
        number: formDataCredit.number,
        expiry: formDataCredit.expiry,
        type: "Nuova Carta", // puoi aggiungere logica per Visa/Mastercard
        default: false,
      },
    ]);

    // Resetto form e chiudo
    setFormDataCredit({ name: "", number: "", expiry: "", cvv: "" });
    setShowFormCredit(false);
  };


  


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
              <div className="border-2 border-transparent rounded-xl w-36 h-16">
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
                  className={`w-64 py-3 px-2 cursor-pointer rounded-lg text-left font-medium transition ${
                    selectedAddress === addr.id
                      ? "bg-[#F5FCFB] border-[#00C2A8] border-2 text-black"
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
                    onClick={() => {setSelectedShippingCost(option.cost); 
                      if (option.id === 3) setShowDatePicker(true); // apre calendario
                    }}
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

<IonModal 
  isOpen={showDatePicker}
  onDidDismiss={() => setShowDatePicker(false)}
>
  <div className="p-6">
    <h2 className="text-lg font-semibold">Data di consegna</h2>

    {/* IonDatetime stile Ionic */}
<IonDatetime className="py-7 h-6 bg-transparent"
  presentation="date"
  onIonChange={(e) => {
    const value = e.detail.value as string;
    if (value) {
      setCustomDate(value); // salvo direttamente la stringa ISO
    }
  }}
/>

    <div className="flex justify-between mt-[-20px]">
      <IonButton
        fill="clear"
        className="rounded-full border border-red-500 text-red-500"
        onClick={() => setShowDatePicker(false)}
      >
        Annulla
      </IonButton>
      <IonButton
        className="bg-[#00C2A8] text-white rounded-full"
        fill="clear"
        onClick={() => setShowDatePicker(false)}
      >
        Conferma
      </IonButton>
    </div>
  </div>
</IonModal>


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
  <div onClick={() => setShowBottomSheet(true)}
    className="mt-8 px-5 py-3 rounded-xl text-white text-center flex flex-col items-center font-bold text-xl  bg-[#00C2A8]"
  >
    <div className="w-full flex justify-between">
      <p>Totale</p>
      <div className="w-9 h-[4.3px] ml-2.5 bg-white rounded-full"></div>
      <p>€ {total}</p>
    </div>
    <div className="mt-4 w-full flex justify-center ">
      <IonButton
        className="w-[100%] bg-[white] rounded-full"
        fill="clear"
        onClick={(e) => {
          e.stopPropagation();
          // vai direttamente al pagamento
         
          setShowPagamento(true);
        }}
      >
        <span className="text-[19px]">Continua</span>
      </IonButton>
    </div>
  </div>
)}

          
          </div>
        )}

        {/* Overlay pagamento fullscreen */}
{showPagamento && (
  <div className="fixed inset-0 bg-white z-50 p-6 overflow-auto flex flex-col">
    <div className="flex items-center justify-center mb-4 mt-4">
      <IonButton
        className="ml-[-120px]"
        fill="clear"
        onClick={() => setShowPagamento(false)}
      >
        <IonIcon icon={chevronBack} className="text-black" />
      </IonButton>
      <h2 className="text-lg font-semibold ml-2">Pagamento</h2>
    </div>

    <p className="font-bold text-[18px] mb-4">Metodo di pagamento</p>

    {/* Carta selezionata */}
    <div className="border-[1px] border-[#E2E8F0] p-7 rounded-3xl">
      {cards.map((card, index) => (
        <div
          key={index}
           onClick={() => setSelectedCard(index)}
          className={`border rounded-xl p-4 mb-3 flex justify-between items-start ${
            selectedCard === index
          ? "border-2 border-[#00C2A8] bg-[#F5FCFB]"
          : "border-2 border-slate-300 hover:border-slate-400"
          }`}
        >
          <div>
            <p className="font-semibold">{card.name}</p>
            <p className="text-gray-600 text-sm">
              **** **** **** {card.number.slice(-4)}
            </p>
            <p className="text-gray-500 text-sm">
              {card.type} · Scad {card.expiry}
            </p>
          </div>
          {card.default && (
            <span className="bg-[#C6F4EE] text-[#00C2A8] text-xs font-semibold px-3 py-1 rounded-full">
              Predefinito
            </span>
          )}
        </div>
      ))}
        {/* Aggiungi nuova carta */}
            {!showFormCredit && (
        <div
          onClick={() => setShowFormCredit(true)}
          className="border rounded-xl p-4 shadow-md"
        >
          <p className="text-center text-green-600 font-medium">
            ➕ Aggiungi nuova carta
          </p>
        </div>
      )}

        {showFormCredit && (
            <div className="mt-4 bg-white p-6 rounded-2xl z-40 top-0 left-0 absolute h-[100%] w-[100%] shadow-lg">
           <div className="flex items-center justify-center mb-4 mt-4">
              <h2 className="text-lg font-semibold ml-2">Nuova carta</h2>
            </div>

          <form className="flex flex-col gap-4">
            <input
              name="name"
              type="text"
              placeholder="Nome e Cognome del titolare"
              value={formDataCredit.name}
              onChange={handleChangeCredit}
              className="w-full border rounded-lg p-3"
            />
            <input
              name="number"
              type="text"
              placeholder="Numero"
              value={formDataCredit.number}
              onChange={handleChangeCredit}
              className="w-full border rounded-lg p-3"
            />
            <div className="flex gap-4">
              <input
                name="expiry"
                type="text"
                placeholder="Scad 09/21"
                value={formDataCredit.expiry}
                onChange={handleChangeCredit}
                className="flex-1 border rounded-lg p-3"
              />
              <input
                name="cvv"
                type="text"
                placeholder="CVV"
                value={formDataCredit.cvv}
                onChange={handleChangeCredit}
                className="w-24 border rounded-lg p-3"
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <input type="checkbox" defaultChecked />
              <p className="text-sm">
                <span className="font-semibold">Salva questa carta</span>
                <br />
                <span className="text-gray-500">
                  Per usarlo nei prossimi pagamenti
                </span>
              </p>
            </div>

            <div className="text-center bg-[#F5FCFB] border-[#00C2A8] border-2 py-2 rounded-full text-green-600 font-medium cursor-pointer">
              Scannerizza la carta
            </div>

          <div className="flex gap-2 mt-6">
                <IonButton
                shape="round"
                size="default"
                fill="clear"
                 onClick={handleSubmitCredit}
                disabled={!isFormValid}
                className={`flex-1 ${
                  isFormValid
                    ?  "bg-green-500 text-white rounded-full"
                    : "bg-[#9CE1D4] text-white rounded-full"
                }`}
                >
                  <span style={{color:"white"}} className="font-semibold">Conferma indirizzo</span>
                </IonButton>
                <IonButton
                fill="clear"
                  onClick={() => setShowFormCredit(false)}
                  className="flex-1 border-[2px]  h-4 rounded-full border-red-700 py-2  "
                >
                  <span style={{color:"black"}} className="font-semibold mt-[-20px] text-black">Annulla</span>
                </IonButton>
              </div>
         
          </form>
          </div>
        )}

        {/* Oppure */}
    
        </div>

            <div className="flex items-center my-6">
          <div className="flex-grow "></div>
          <span style={{color:"#9CA3AF"}} className="px-3 text-gray-400 text-sm">oppure</span>
          <div className="flex-grow "></div>
        </div>

        {/* Metodi alternativi */}
        <div className="flex justify-around gap-8">
          <div className="border rounded-xl w-24 h-14 flex items-center justify-center">
            <img
              src="paypal.svg"
              alt="PayPal"
              className="h-8"
            />
          </div>
          <div className="border rounded-xl w-24 h-14 flex items-center justify-center">
            <img
              src="google pay.svg"
              alt="Google Pay"
              className="h-6"
            />
          </div>
          <div className="border rounded-xl w-24 h-14 flex items-center justify-center">
            <img
              src="apple pay.svg"
              alt="Apple Pay"
              className="h-8"
            />
          </div>
        </div>
    {selectedShippingCost !== null && (
  <div onClick={() => setShowBottomSheet(true)}
    className="mt-8 z-30 px-5 py-3 rounded-xl text-white text-center flex flex-col items-center font-bold text-xl  bg-[#00C2A8]"
  >
    <div className="w-full flex justify-between">
      <p>Totale</p>
      <p>€ {total}</p>
    </div>
    <div className="mt-4 w-full flex justify-center ">
      <IonButton
        className="w-[100%] bg-[white] rounded-full"
        fill="clear"
        onClick={(e) => {
          e.stopPropagation();
          // vai direttamente al pagamento
         
          setShowPagamento(true);
        }}
      >
        <span className="text-[19px]">Concludi acquisto</span>
      </IonButton>
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
    {shippingOptions.find((s) => s.cost === selectedShippingCost)?.label}
  </p>
<p className="text-gray-600">
  {customDate
    ? new Date(customDate).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Nessuna data selezionata"}
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
            <div className=" flex justify-center items-center">
            <IonButton
        className="w-[70%] bg-[#00C2A8] rounded-full mt-5"
        fill="clear"
        onClick={(e) => {
          e.stopPropagation();
          // vai direttamente al pagamento
         
          setShowPagamento(true);
        }}
      >
        <span style={{color:"white"}} className="text-[19px]">Continua</span>
      </IonButton>
      </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default QrCodeResult;
