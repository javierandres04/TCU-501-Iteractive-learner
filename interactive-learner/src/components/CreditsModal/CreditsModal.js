import Modal from 'react-modal';
import { motion } from "framer-motion";
import { container, item } from '../../framerMotionOptions';
import './CreditsModal.css'

export const CreditsModal = ({ isCreditsModalOpen, setIsCreditsModalOpen }) => {
  const closeModal = () => {
    setIsCreditsModalOpen(false);
  }

  return (
    <Modal
      isOpen={isCreditsModalOpen}
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
        <motion.h2 variants={item} className={"title"}>About Interactive Learner </motion.h2>
        <motion.label className='instructionLabel' variants={item}>{"TCU-501:"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Email: tcu501.elm@ucr.ac.cr"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Web page: https://lenguasmodernas.ucr.ac.cr/tcu-501/ "}</motion.label>
        <motion.label className='instructionLabel' variants={item}>{"Coordinator TCU-501:"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Mag. Roxana Chévez H."}</motion.label>
        <motion.label className='instructionLabel' variants={item}>{"Developers:"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Sebastián Alfaro"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Javier Molina"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Fabián González"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Kevin Arguedas"}</motion.label>
        <motion.label className='instructionLabel' variants={item}>{"Audio voice lines:"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Ashley Jones"}</motion.label>
        <motion.label className='instructionLabel' variants={item}>{"Recursos externos utilizados:"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Banco de imagenes TCU 501"}</motion.label>
        <motion.label className='devLabel' variants={item}>{"Efectos de sonido de freesound.org"}</motion.label>
      </motion.div>
    </Modal >
  )
}
