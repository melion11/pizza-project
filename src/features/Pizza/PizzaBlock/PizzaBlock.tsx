import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/hooks';
import {cartActions} from '../../Cart/cartSlice';
import {Link} from 'react-router-dom';
import {PizzaItem} from '../../Cart/types';
import {AddIcon} from '../../../components/ui/svg/AddIcon';


type PizzaBlock = {
    id: string,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number
    category?: number,
    rating?: number
}

const typeNames = ['thin', 'traditional']
const sizeTypes = [26, 30, 40]


export const PizzaBlock = ({id, price, sizes, imageUrl, types, title}: PizzaBlock) => {

    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)
    const dispatch = useAppDispatch()

    const cartItem = useAppSelector(state => state.cart.items.find(item => {
        return ((item.id === id) &&
            (item.size === sizeTypes[activeSize]) &&
            (item.type === typeNames[activeType]))
    }))

    const addedCount = cartItem ? cartItem.count : 0


    const pizzaTypeElements = types?.map((type, index) => {
        return (
            <li onClick={() => setActiveType(type)} className={activeType === index ? 'active' : ''}
                key={index}>{typeNames[type]}</li>
        )
    })

    const pizzaSizeElements = sizes?.map((size, index) => {
        return (
            <li onClick={() => setActiveSize(index)} className={activeSize === index ? 'active' : ''}
                key={index}>{size} cm.</li>
        )
    })

    const addPizzaHandler = () => {
        const item: PizzaItem = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizeTypes[activeSize],
            count: 1
        }
        dispatch(cartActions.addItem({item}))
    }

    return (
        <div className="container">
            <div className="pizza-block-wrapper">
                <div className="pizza-block">
                    <Link to={`/pizza/${id}`}>
                        <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
                        <h4 className="pizza-block__title">{title}</h4>
                    </Link>
                    <div className="pizza-block__selector">
                        <ul>
                            {pizzaTypeElements}
                        </ul>
                        <ul>
                            {pizzaSizeElements}
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">from {price}₽</div>
                        <div onClick={addPizzaHandler} className="button button--outline button--add">
                            <AddIcon/>
                            <span>Add</span>
                            {addedCount > 0 && <i>{addedCount}</i>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

