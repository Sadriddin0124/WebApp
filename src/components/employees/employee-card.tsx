import React, { useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button, Cell } from "@telegram-apps/telegram-ui";
import { MdDelete } from "react-icons/md";
import { BiPencil, BiPhone } from "react-icons/bi";
import { IEmployee } from "@/core/types/employee.types";
import Image from "next/image";

const EmployeeCard = ({
  employee,
  search,
}: {
  search?: string;
  employee: IEmployee;
}) => {
  const {
    x,
    handleDragStart,
    handleDragEnd,
    dragging,
    direction,
    handleDrag,
  } = useSwipeAction(employee);

  const opacity = useTransform(x, [0, 200], [1, 0]);
  const layer = useTransform(x, [0, 200], [0, 1]);

  const router = useRouter();

  const handleNavigate = () => {
    if (dragging) return;
    // router.push(`/employees/info?id=${employee.id}`);
  };

  return (
    <motion.div className="relative w-full flex items-center cursor-pointer overflow-hidden border-b">
      {/* Drag-able Card Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        style={{ x, opacity }}
        onClick={handleNavigate}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={(event, info) => handleDragEnd(event as MouseEvent, info)}
        className="flex w-full relative z-30 justify-between items-center bg-white"
      >
        <Cell className="!bg-white w-full text-black">
          <div className="flex items-center gap-4">
            <div className="w-[58px] h-[58px] flex-shrink-0">
              <Image
                src={employee.image || "/default-avatar.png"}
                alt={employee.name}
                className="rounded-full object-cover"
                width={58}
                height={58}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base">{employee.name}</span>
              <span className="text-sm text-gray-500">{employee.number}</span>
            </div>
          </div>
        </Cell>
      </motion.div>

      {/* Drag Layer Effect */}
      {direction === "right" && (
        <motion.div
          className="absolute left-0 top-0 pl-4 flex gap-2 justify-start items-center h-full w-full bg-green-500 z-10"
          style={{ opacity: layer }}
        >
            <BiPhone size={32}/> 
            <span>Qo&apos;ng&apos;iroq qilish</span>
        </motion.div>
      )}

      {/* Action Buttons on Drag Left */}
      <motion.div
        style={{ opacity }}
        className="absolute right-0 top-0 h-full w-[150px] flex items-center justify-end pr-4 z-20"
      >
        <div className="flex items-center">
            <Button size="s" mode="plain" >
              <BiPencil className="w-6 h-6 text-blue-500" />
            </Button>
          
            <Button size="s" mode="plain">
              <MdDelete className="w-6 h-6 text-red-500" />
            </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmployeeCard;


const useSwipeAction = (employee: IEmployee) => {
  const x = useMotionValue(0); // Unique motion value per employee
  const [dragging, setDragging] = useState(false);
  const router = useRouter();
  const [direction, setDirection] = useState<"left" | "right" | "">("left");

  // Handle drag start
  const handleDragStart = () => {
    setDragging(true);
    setDirection(""); // Reset at start
  };

  const handleDrag = (
    _: any,
    info: { point: { x: number }; offset: { x: number } }
  ) => {
    if (info.offset.x > 0) {
      setDirection("right");
    } else if (info.offset.x < 0) {
      setDirection("left");
    }
  };
  // Handle drag end (per item)
  const handleDragEnd = (_: MouseEvent, info: { offset: { x: number } }) => {
    const movement = info.offset.x;

    if (movement > 100) {
      // Dragged right → Reset position & navigate
      animate(x, 0, { type: "tween", stiffness: 300 });
        router.push(`tel:+${employee?.number}`);
      setDirection("right");
    } else if (movement < -40) {
      // Dragged left → Stay at -120px & open delete modal
      animate(x, -120, { type: "tween", stiffness: 300 });
    } else {
      // If movement is < 120px → Snap back to original position
      animate(x, 0, { type: "tween", stiffness: 300 });
    }

    setDragging(false);
  };

  return { x, handleDragStart, handleDragEnd, dragging, direction, handleDrag };
};
