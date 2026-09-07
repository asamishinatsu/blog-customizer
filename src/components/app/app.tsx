import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [formStyles, setFormStyles] = useState<CSSProperties>({});

	const handleStyleChange = (newData: ArticleStateType) => {
		setFormStyles({
			'--font-family': newData.fontFamilyOption.value,
			'--font-size': newData.fontSizeOption.value,
			'--font-color': newData.fontColor.value,
			'--container-width': newData.contentWidth.value,
			'--bg-color': newData.backgroundColor.value,
		} as CSSProperties);
	};

	return (
		<main className={clsx(styles.main)} style={formStyles}>
			<ArticleParamsForm
				onSubmit={handleStyleChange}
				initialValue={defaultArticleState}
			/>
			<Article />
		</main>
	);
};
