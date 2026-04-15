import { useState } from "react";
import "./App.css";
import Modal from "./components/modal";
import {
  PricingSection,
  LeadFormSection,
  TestimonialsSection,
  Footer,
} from "./components/PricingAndFooter";
import {
  Header,
  HeroSection,
  AboutSection,
  FeaturesSection,
} from "./components/sections";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", type: "" });

  const openModal = (type, title) => {
    setModalContent({ title, type });
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Дякуємо! Ми зв'яжемося з вами найближчим часом.");
    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        onSubmit={handleSubmit}
      />

      <div
        className={`transition-all duration-300 ${isModalOpen ? "blur-sm" : "blur-0"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header onOpenModal={openModal} />
          <HeroSection onOpenModal={openModal} />
          <AboutSection />
          <FeaturesSection />
          <PricingSection onOpenModal={openModal} />
          <LeadFormSection onOpenModal={openModal} />
          <TestimonialsSection />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
