import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import CountDown from "./components/timer/timer.component";
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import {Cell, IS_PLATFORM_ANDROID, IS_PLATFORM_IOS, Link} from "@vkontakte/vkui";

import {
	PanelHeaderButton,
	Div,
	Card,
	CardGrid,
	Epic,
	Group,
	Header,
	ModalPage,
	ModalRoot,
	Panel,
	PanelHeader,
	Tabbar,
	TabbarItem
} from "@vkontakte/vkui";
import TaskData from "./tasks.json";
import RichCell from "@vkontakte/vkui/dist/components/RichCell/RichCell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import PlaceholderComponent from "./components/placeholder/placeholder.component";

const App = () => {
	const [activeStory,setActiveStory] = useState('main');
	const [activeModal,setActiveModal] = useState(null);
	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
	}, []);

	const onStoryChange = (e) => {
		setActiveStory(e.currentTarget.dataset.story)
	}

	const Modal = (
		<ModalRoot activeModal={activeModal} onClose={(e) => setActiveModal(null)}>
			{
				TaskData.map((Task,i) => {
					return(
						<ModalPage dynamicContentHeight={true} settlingHeight={100} id={Task.id} header={
							<ModalPageHeader
								left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={(e) => setActiveModal(null)}><Icon24Cancel /></PanelHeaderButton>}
							>{Task.left_message}</ModalPageHeader>
						} >
							<Group separator="hide">
								<CountDown time={Task.date} />
							</Group>
							<Group header={<Header mode="secondary">Материалы для подготовки</Header>}>
								{
									Task.attachements.map((attachement,i) => {
										return(
											<Cell href={attachement.link}>{attachement.name}</Cell>
										);
									})
								}
							</Group>
							<PlaceholderComponent></PlaceholderComponent>
						</ModalPage>

					);
				})
			}

		</ModalRoot>);
	return (

		<Epic activeStory={activeStory} tabbar={
			<Tabbar>
				<TabbarItem
				onClick={onStoryChange} selected={activeStory === 'main'} data-story="main" text="Главная">
					<Icon24Home />
				</TabbarItem>
				<TabbarItem
					onClick={onStoryChange} selected={activeStory === 'second'} data-story="second" text="Предметы"
					><Icon28BrainOutline />
				</TabbarItem>
			</Tabbar>
		}>
			<View activePanel="main" id="main">
				<Panel id="main">
					<PanelHeader>Главная</PanelHeader>
					<Group separator="hide" header={<Header mode="secondary">Осталось до ЕГЭ</Header>}>
						<CountDown time="jun 8, 2020 00:00:00" />
					</Group>
				</Panel>
			</View>
			<View activePanel="second" id="second" modal={Modal}>
				<Panel id="second">
					<PanelHeader>Предметы</PanelHeader>
					<Group>
						{
							TaskData.map((Task,i) => {
								return (
									<RichCell
										before={<Avatar size={48} src={"https://radionurshat.github.io/vk-ege/img/"+Task.avatar} />}
										caption={Task.date_public}
										onClick={(e) => setActiveModal(Task.id)}
									>
										{Task.name}
									</RichCell>
								);
							})
						}

					</Group>

				</Panel>
			</View>
		</Epic>

	);
}

export default App;

