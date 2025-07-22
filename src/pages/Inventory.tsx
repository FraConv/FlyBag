import { IonButton, IonPage } from "@ionic/react";
import { ChevronLeft } from "lucide-react";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";

const Inventory: React.FC = () => {
  const navigate = useHistory();
  const [selectedView, setSelectedView] = useState<"griglia" | "lista">("griglia");
  const [cards, setCards] = useState<
    { prezzo: string; nome: string; foto: string; quantita: string; peso: string; dimensioni: string | null; tipologia: string }[]
  >([]);
  const [showForm, setShowForm] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null);
  const [formData, setFormData] = useState({ prezzo: "", nome: "", quantita: "", peso: "", dimensioni: "", tipologia: "Seleziona tipologia" });
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [menuTipologiaOpen, setMenuTipologiaOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const opzioniTipologia = ["Abbigliamento", "Musica", "Gadget", "Accessori", "Altro"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.prezzo || !formData.nome) return;

    const newCard = {
      prezzo: formData.prezzo,
      nome: formData.nome,
      foto: preview || "",
      quantita: formData.quantita,
      dimensioni: formData.dimensioni,
      peso: formData.peso,
      tipologia: formData.tipologia,
    };

    if (isEditing && editIndex !== null) {
      setCards((prev) => {
        const updated = [...prev];
        updated[editIndex] = newCard;
        return updated;
      });
    } else {
      setCards((prev) => [...prev, newCard]);
    }

    setFormData({ prezzo: "", nome: "", quantita: "", peso: "", dimensioni: "", tipologia: "Seleziona tipologia" });
    setFotoFile(null);
    setPreview(null);
    setIsEditing(false);
    setEditIndex(null);
    setShowForm(false);
  };

  const handleDeleteCard = (indexToDelete: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== indexToDelete));
  };

  return (
    <IonPage>
      {/* Header */}
      <div className="flex justify-between items-start gap-2 mt-[3rem]">
        <div className="flex flex-row gap-5 ml-[1.9rem]">
          <ChevronLeft
            onClick={() => navigate.push("/Analytics")}
            className="scale-[120%] mt-1 ml-[-10px] text-black"
          />
          <span style={{color:"black"}} className="font-bold text-xl">Inventario</span>
        </div>
      </div>

      {/* Switch Griglia/Lista */}
      <div className="right-[1.9rem] top-[5.5rem] absolute z-10">
        <div className="bg-[#6EDDC1] w-40 h-7 flex flex-row justify-start rounded-md p-1 gap-2.5">
          {["griglia", "lista"].map((view) => (
            <div
              key={view}
              className={`w-[4.5rem] px-0.5 rounded-sm flex gap-1 items-center cursor-pointer ${selectedView === view ? "bg-white" : ""}`}
              onClick={() => setSelectedView(view as "griglia" | "lista")}
            >
              <img
                className="scale-95"
                src={
                  selectedView === view
                    ? view === "griglia"
                      ? "Griglia verde icon.svg"
                      : "Lista icon.svg"
                    : view === "griglia"
                    ? "Griglia icon.svg"
                    : "Lista bianca icon.svg"
                }
                alt={view}
              />
              <p className={`text-[0.8rem] font-medium ${selectedView === view ? "text-[#6EDDC1]" : "text-white"}`}>
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div
        className={`absolute left-0 top-[10rem] w-full px-6 gap-4 transition-all duration-300 ${
          selectedView === "griglia" ? "grid grid-cols-2 md:grid-cols-3" : "flex flex-col"
        }`}
      >
        {cards.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setShowCard(true);
              setSelectedCard(item);
            }}
            className={`border-2 rounded-md text-black relative transition-all duration-300 cursor-pointer ${
              selectedView === "griglia" ? "w-full h-auto p-4" : "w-full h-32 flex items-center"
            }`}
          >
            {item.foto && (
              <img
                src={item.foto}
                alt={item.nome}
                className={`object-cover rounded mr-4 ${selectedView === "griglia" ? "w-40 h-40" : "w-28 h-28 pl-2"}`}
              />
            )}

            <div>
              <p className="font-bold text-lg mt-2">{item.nome}</p>
              <div className={`${selectedView === "griglia" ? "flex gap-7" : "mt-5"}`}>
                <p className="text-sm">Qty: {item.quantita}</p>
                <p className="text-sm">{item.prezzo}$</p>
              </div>
              <div
                className={`${
                  selectedView === "griglia"
                    ? "flex gap-4 justify-end pt-4"
                    : "flex gap-4 justify-end absolute right-4 bottom-4"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCard(index);
                  }}
                  className="text-red-500 text-lg hover:scale-110 transition-transform"
                  title="Elimina"
                >
                  <img className="scale-125" src="Cestino icon.svg" alt="Elimina" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

        

      {/* Card Dettagli */}
         {showCard && selectedCard && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50 px-6 py-10 overflow-auto">
          <div className="flex justify-start items-center gap-2 mb-8 w-full">
            <ChevronLeft
              onClick={() => {
                setShowCard(false);
                setSelectedCard(null);
              }}
              className="scale-[120%] mt-1 text-black cursor-pointer"
            />
            <span style={{ color: "black" }} className="text-xl font-bold text-black">{selectedCard.nome}</span>
          </div>

          <div className="text-black">
            <img src={selectedCard.foto} alt={selectedCard.nome} className="w-full max-w-xs mx-auto mb-4 rounded-xl" />
            <div className="flex justify-between">
              <p><strong className="text-[#00A279]">€ {selectedCard.prezzo}</strong></p>
              <div className="bg-[#E5E7EB] rounded-full px-2">
                <p>Quantità: <strong>{selectedCard.quantita}</strong></p>
              </div>
            </div>
          </div>

          <div className="text-black mt-14 border-2 p-3 rounded-xl border-[#E9EEF4]">
            <p className="font-bold">Specifiche prodotto</p>
            <div className="mt-2">
              <p>Peso: <strong>{selectedCard.peso} kg</strong></p>
              <p>Dimensioni: <strong>{selectedCard.dimensioni}</strong></p>
              <p>Tipologia: <strong>{selectedCard.tipologia}</strong></p>
            </div>
          </div>

          <div className="flex justify-end">
            <IonButton
              size="small"
              fill="clear"
              className="border-2 border-[#E9EEF4] w-28 rounded-full mt-4 px-2"
              onClick={() => {
                const index = cards.findIndex(c => c === selectedCard);
                if (index !== -1) {
                  setIsEditing(true);
                  setEditIndex(index);
                  setFormData({
                    nome: selectedCard.nome,
                    prezzo: selectedCard.prezzo,
                    quantita: selectedCard.quantita,
                    peso: selectedCard.peso,
                    dimensioni: selectedCard.dimensioni || "",
                    tipologia: selectedCard.tipologia,
                  });
                  setPreview(selectedCard.foto || null);
                  setShowCard(false);
                  setShowForm(true);
                }
              }}
            >
              <div className="flex justify-between gap-2.5">
                <img src="modifica icon.svg" alt="" />
                <span style={{ color: "#878787" }}>Modifica</span>
              </div>
            </IonButton>
          </div>
        </div>
      )}


      {/* Pulsante Aggiungi */}
      <div className="justify-end flex items-end">
        <button
          style={{ borderRadius: 100 }}
          onClick={() => setShowForm(true)}
          className="w-14 h-14 text-white text-6xl font-medium flex justify-center items-center mr-[1.9rem] bg-[#6EDDC1] mb-[2rem]"
        >
          <img className="scale-90" src="Aggiungi icon.svg" alt="Aggiungi" />
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50 px-6 py-10 overflow-auto">
          <div className="flex justify-start items-center gap-2 mb-8 w-full">
            <ChevronLeft
              onClick={() => {
                setShowForm(false);
                setFormData({ prezzo: "", nome: "", quantita: "", peso: "", dimensioni: "", tipologia: "Seleziona tipologia" });
                setFotoFile(null);
                setPreview(null);
              }}
              className="scale-[120%] mt-1 text-black cursor-pointer"
            />
            <span style={{color:"black"}} className="text-xl font-bold text-black">Aggiungi Articolo</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            {/* Upload foto */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-52 h-52 bg-gray-100 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer"
            >
              {preview ? (
                <img src={preview} alt="Anteprima" className="w-full h-full object-cover rounded" />
              ) : (
                <span className="text-gray-500 text-xl text-center font-medium">
                  +<br />Aggiungi foto
                </span>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

            {/* Campi form */}
            <div className="grid grid-cols-1 gap-2 mt-8 w-full max-w-md">
              <label className="text-black">Nome</label>
              <input 
                style={{color:"black"}}
                required
                className="border p-2 rounded-md text-black"
                placeholder="Es. Tazza Bari"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />

              <label className="text-black mt-4">Tipologia</label>
              <IonButton
                fill="clear"
                className="bg-white border border-[#E5E7EB] rounded-md px-4"
                onClick={() => setMenuTipologiaOpen((prev) => !prev)}
              >
                <div className="flex justify-between w-full">
                  <span style={{color:"black"}} className="font-medium text-[16px] text-black">{formData.tipologia}</span>
                  <img
                    className={`w-4 transition-transform duration-200 ${menuTipologiaOpen ? "rotate-180" : "rotate-0"}`}
                    src="Arrow giu.svg"
                    alt="Arrow"
                  />
                </div>
              </IonButton>

              {menuTipologiaOpen && (
                <div className="bg-white shadow-md rounded-xl z-30">
                  {opzioniTipologia.map((opzione) => (
                    <div
                      key={opzione}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-[15px]"
                      onClick={() => {
                        setFormData({ ...formData, tipologia: opzione });
                        setMenuTipologiaOpen(false);
                      }}
                    >
                      {opzione}
                    </div>
                  ))}
                </div>
              )}

              {/* Campi quantità, prezzo */}
              <div className="flex flex-row gap-2 mt-4">
                <div>
                  <label className="text-black">Quantità</label>
                  <input 
                    style={{color:"black"}}
                    required
                    className="border p-2 rounded-md text-black w-full"
                    placeholder="Es. 5"
                    value={formData.quantita}
                    onChange={(e) => setFormData({ ...formData, quantita: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-black">Prezzo</label>
                  <input 
                    style={{color:"black"}}
                    required
                    className="border p-2 rounded-md text-black w-full"
                    placeholder="Es. 10"
                    value={formData.prezzo}
                    onChange={(e) => setFormData({ ...formData, prezzo: e.target.value })}
                  />
                </div>
              </div>

              <label className="text-black mt-4">Dimensioni (L x P x A cm)</label>
              <input 
                style={{color:"black"}}
                required
                className="border p-2 rounded-md text-black"
                placeholder="Es. 30 x 20 x 10"
                value={formData.dimensioni}
                onChange={(e) => setFormData({ ...formData, dimensioni: e.target.value })}
              />

              <label className="text-black mt-4">Peso (kg)</label>
              <input 
                style={{color:"black"}}
                required
                className="border p-2 rounded-md text-black"
                placeholder="Es. 0.5"
                value={formData.peso}
                onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
              />

              <IonButton type="submit" className="text-white text-[18px] mt-5" shape="round">
                Salva Articolo
              </IonButton >
            </div>
          </form>
        </div>
      )}
    </IonPage>
  );
};

export default Inventory;
