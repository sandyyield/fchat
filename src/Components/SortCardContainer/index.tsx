import { CSSProperties, useCallback, useEffect, useState } from "react"
import { Card } from "../Card"
import update from 'immutability-helper'
import { Button } from "antd"


const style: CSSProperties = {
    width: 400,
}

export const SortCardContainer = () => {
    const SetInitRandArr = (len: number) => {
        let arr: Array<{ id: number, text: string }> = [];
        for (let i = 1; i <= len; i++) {
            arr.push({ id: i, text: `第${i}行` })
        }
        setCards(arr);
    }

    useEffect(() => {
        SetInitRandArr(9);
        return () => { }
    }, [])

    const [cards, setCards] = useState([
        {
            id: 1,
            text: '1',
        },
        {
            id: 2,
            text: '2',
        },
        {
            id: 3,
            text: '3',
        },
        {
            id: 4,
            text: '4',
        },
        {
            id: 5,
            text: '5',
        },
        {
            id: 6,
            text: '6',
        },
        {
            id: 7,
            text: '7',
        },
    ])


    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragCard = cards[dragIndex];
            console.log('callback');

            setCards(
                update(cards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            )
        },
        [cards],
    )


    const rederCard = (card: { id: number, text: string }, index: number) => {
        return (
            <Card
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
            />
        )
    }

    const handlePrint = () => cards.map((i, index) => console.log(i.text));

    return (
        <div style={style}>
            {cards.map((card, index) => rederCard(card, index))}
            <Button onClick={handlePrint}>print</Button>
        </div>
    )
}