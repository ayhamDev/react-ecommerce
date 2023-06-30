import { MotionProps } from "framer-motion";

const AdminMotionProps: MotionProps = {
  initial: { opacity: 0.2, scale: 0.975 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, easings: ["easeIn"] },
};
const ClientMotionProps: MotionProps = {};
export { AdminMotionProps, ClientMotionProps };
