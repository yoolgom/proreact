import React, {Component, render} from 'react';
// import {render} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AnimatedShoppingList extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			items: [
				{id: 1, name: 'Milk'},
				{id: 2, name: 'Yogurt'},
				{id: 3, name: 'Orange Juice'}
			]
		}
	}


	handleChange(evt) {
		if (evt.key === 'Enter') {
			//새 항목 만듬
			const newItem = {id: Date.now(), name: evt.target.value};
			//이전 items에 새 항목을 추가해 새로운 배열을 만듬.
			const newItems = this.state.items.concat(newItem);
			//텍스트값을 비움
			evt.target.value = '';
			//새로운 state설정
			this.setState({items: newItems});

		}
	}

	handleRemove(idx) {
		const newItem = this.state.items;
		newItem.splice(idx, 1);
		this.setState({items: newItem})
	}

	render() {
		const shoppingItems = this.state.items.map((item, idx) => (
			<div key={item.id}
			     className='item'
			     onClick={this.handleRemove.bind(this, idx)}>
				{item.name}
			</div>
		));

		return (
			<div className='testAnimatedShoppingList'>
				<h3>Animated shopping list</h3>
				<ReactCSSTransitionGroup
					transitionName="example" //실제 애니메이션 정의하는 클래스이름
					transitionEnterTimeout={300} //enter 할때 지정된 시간후 클래스제거
					transitionLeaveTimeout={300} //leave 할때 지정된 시간후 클래스제거
					transitionAppear={true} //초기 마운트때 동작여부
					transitionAppearTimeout={2000}
				>
					{shoppingItems}
				</ReactCSSTransitionGroup>
				<input type='text' value={this.state.newItem}
				       onKeyDown={this.handleChange.bind(this)}
				/>

			</div>
		)
	}
}

export default AnimatedShoppingList;