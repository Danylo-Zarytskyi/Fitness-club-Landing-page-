import { useState } from "react";
import "./App.css";
import Modal from "./components/modal";

import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { PricingSection } from "./components/sections/PricingSection";
import { LeadFormSection } from "./components/sections/LeadFormSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { Footer } from "./components/sections/Footer";

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
        className={`transition-all duration-300 ${
          isModalOpen ? "blur-sm" : "blur-0"
        }`}
      >
        <div>
          <Header onOpenModal={openModal} />
          <HeroSection onOpenModal={openModal} />
          <AboutSection />
          <FeaturesSection />
          <PricingSection onOpenModal={openModal} />
          <TestimonialsSection />
          <LeadFormSection onOpenModal={openModal} />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
