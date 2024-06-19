import React, { useState } from "react";
import BasicModal from '../../components/BasicModal/BasicModal';
const Registrations = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <h1>Teste Modal</h1>
      <button onClick={() => setModalOpen(true)}
        aria-label='botão para abrir um modal'>Abrir Modal</button>

      <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default Registrations;
