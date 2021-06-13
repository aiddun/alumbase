import React, { useCallback, useState, memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch"; // or any other pipeline
// I have no clue WTF this is, it was in the sample code for immutable array transformations
import update from "immutability-helper";

export interface ContainerState {
  cards: any[];
}

const ItemTypes = {
  CARD: "card",
};

const ITEMS = [
  {
    id: "1",
    data: {
      title: "Senior Software Engineer",
      employer: "Google",
      range: { start: "2019", end: "Present" },
      desc: "None",
    },
  },
  {
    id: "2",
    data: {
      title: "Software Engineer",
      employer: "Clubhouse",
      range: { start: "2015", end: "2019" },
      desc: "None",
    },
  },
];

export interface CardProps {
  id: string;
  text: string;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}

interface Item {
  id: string;
  originalIndex: number;
}

const EduExpTableLi = memo(({ moveCard, id, findCard, data }: any) => {
  const {
    title,
    employer,
    range: { start, end },
  } = data;

  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      canDrop: () => false,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;

  return (
    <li
      className={`border-t border-gray-200`}
      ref={(node) => preview(drop(node))}
    >
      <div
        className={`block hover:bg-gray-50 active:bg-white focus:outline-none focus:bg-gray-50 
        transition duration-150 ease-in-out ${isDragging ? "opacity-10" : ""}`}
      >
        <div className="px-4 py-4 sm:px-3">
          <div className="flex justify-between leading-6">
            <div className="flex justify-between items-center">
              {/* drag bar */}
              <div
                className="mr-2 w-3 h-9 flex justify-center items-center hover:bg-gray-100 
                active:bg-white active:border-red group cursor-pointer"
                ref={drag}
              >
                {/* group-hover is so parent also controls || color */}
                <div className="w-1 h-7 border-l border-r group-hover:border-gray-400 "></div>
              </div>
              {/* bio info */}
              <div className="text-left">
                <p className="text-xs text-gray-900">{`${start}-${end}`}</p>
                <p className="text-md font-medium">{title}</p>
                <p className="text-sm">{employer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
});

// Inside context
const EduExpTableContainer = memo(() => {
  const [cards, setCards] = useState(ITEMS);

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md" ref={drop}>
      <ul>
        <div>
          {cards.map(({ id, data }) => (
            <EduExpTableLi
              key={id}
              id={id}
              data={data}
              moveCard={moveCard}
              findCard={findCard}
            />
          ))}
        </div>
      </ul>
    </div>
  );
});

const EduExpTable = () => (
  <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    <EduExpTableContainer />
  </DndProvider>
);

export default EduExpTable;
