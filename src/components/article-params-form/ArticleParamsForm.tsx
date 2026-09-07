import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import * as utils from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

export type ArticleFormProps = {
	onSubmit: (data: utils.ArticleStateType) => void;
	initialValue: utils.ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleFormProps) => {
	const [isActive, setActive] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [articleState, setArticleState] = useState<utils.ArticleStateType>(
		props.initialValue
	);

	const updateArticleState = <K extends keyof utils.ArticleStateType>(
		key: K,
		value: utils.ArticleStateType[K]
	) => {
		setArticleState((oldState) => ({
			...oldState,
			[key]: value,
		}));
	};

	const toggleForm = () => {
		setActive((isOpen) => !isOpen);
	};

	useOutsideClickClose({
		isOpen: isActive,
		rootRef,
		onClose: () => setActive(false),
	});

	const handleSubmit = () => {
		props.onSubmit(articleState);
	};

	const handleReset = () => {
		setArticleState(props.initialValue);
		props.onSubmit(props.initialValue);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isActive} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isActive,
				})}>
				<form className={styles.form}>
					<Select
						selected={articleState.fontFamilyOption}
						options={utils.fontFamilyOptions}
						onChange={(option) =>
							updateArticleState('fontFamilyOption', option)
						}
						title={'Шрифт'}
					/>

					<RadioGroup
						name='font-size'
						options={utils.fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={(option) => updateArticleState('fontSizeOption', option)}
						title={'Размер шрифта'}
					/>

					<Select
						selected={articleState.fontColor}
						options={utils.fontColors}
						onChange={(option) => updateArticleState('fontColor', option)}
						title={'Цвет шрифта'}
					/>

					<Separator />

					<Select
						selected={articleState.backgroundColor}
						options={utils.backgroundColors}
						onChange={(option) => updateArticleState('backgroundColor', option)}
						title={'Цвет фона'}
					/>

					<Select
						selected={articleState.contentWidth}
						options={utils.contentWidthArr}
						onChange={(option) => updateArticleState('contentWidth', option)}
						title={'Ширина контента'}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
