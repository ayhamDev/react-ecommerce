import { MotionProps } from "framer-motion";

const AdminMotionProps: MotionProps = {
  initial: { opacity: 0.2, scale: 0.975 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, easings: ["easeIn"] },
};
const ClientMotionProps: MotionProps = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, easings: ["easeInOut"] },
};
const ModalSlidDownMotionProps: MotionProps = {
  initial: { opacity: 0.4, translateY: "-250px" },
  animate: { opacity: 1, translateY: "0px" },
  transition: { type: "spring", bounce: 0.25 },
};
export { AdminMotionProps, ClientMotionProps, ModalSlidDownMotionProps };
