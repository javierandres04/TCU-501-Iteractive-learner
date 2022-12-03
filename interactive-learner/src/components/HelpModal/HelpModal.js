import Modal from 'react-modal';
import { motion } from "framer-motion";
import { container, item } from '../../framerMotionOptions';
import './HelpModal.css'


export const HelpModal = ({ isHelpModalOpen, setIsHelpModalOpen, spanishInstructions, englishInstructions }) => {
  const closeModal = () => {
    setIsHelpModalOpen(false);
  }


  return (
    <Modal
      isOpen={isHelpModalOpen}
      onRequestClose={closeModal}
      contentLabel="Help"
      ariaHideApp={false}
      className={"helpModal"}
      overlayClassName={"overlay"}
    >
      <button className={"closeButton"} onClick={closeModal}> X </button>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={"HelpContainer"}
      >
        <motion.h2 variants={item} className={"title"}>Instructions: </motion.h2>
        {englishInstructions.map((instruction, index) => 
          <motion.label className='instructionLabel' variants={item}>{index + 1}. {instruction}</motion.label>
        )}
        <motion.h2 variants={item} className={'title'}> Instrucciones </motion.h2>
        {spanishInstructions.map((instruction, index) => 
          <motion.label className='instructionLabel' variants={item}>{index + 1}. {instruction}</motion.label>
        )}

      </motion.div>
    </Modal >
  )
}
