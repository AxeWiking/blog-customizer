import { useState, CSSProperties } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [currentState, setCurrentState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentState.fontFamilyOption.value,
					'--font-size': currentState.fontSizeOption.value,
					'--font-color': currentState.fontColor.value,
					'--container-width': currentState.contentWidth.value,
					'--bg-color': currentState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentState={currentState}
				setCurrentState={setCurrentState}
			/>
			<Article />
		</main>
	);
};
