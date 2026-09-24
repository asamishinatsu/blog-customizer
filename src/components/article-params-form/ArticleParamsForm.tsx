import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import * as utils from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

export type ArticleFormProps = {
	onSubmit: (data: utils.ArticleStateType) => void;
	initialValue: utils.ArticleStateType;
	defaultValue: utils.ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [draftArticleState, setDraftArticleState] =
		useState<utils.ArticleStateType>(props.initialValue);

	const updateArticleState =
		<K extends keyof utils.ArticleStateType>(key: K) =>
		(value: utils.ArticleStateType[K]) => {
			setDraftArticleState((oldState) => ({
				...oldState,
				[key]: value,
			}));
		};

	const toggleForm = () => {
		setIsFormOpen((isOpen) => !isOpen);
	};

	const handleFormClose = useCallback(() => setIsFormOpen(false), []);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef,
		onClose: handleFormClose,
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		props.onSubmit(draftArticleState);
	};

	const handleReset = () => {
		setDraftArticleState(props.defaultValue);
		props.onSubmit(props.defaultValue);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Select
						selected={draftArticleState.fontFamilyOption}
						options={utils.fontFamilyOptions}
						onChange={updateArticleState('fontFamilyOption')}
						title={'Шрифт'}
					/>

					<RadioGroup
						name='font-size'
						options={utils.fontSizeOptions}
						selected={draftArticleState.fontSizeOption}
						onChange={updateArticleState('fontSizeOption')}
						title={'Размер шрифта'}
					/>

					<Select
						selected={draftArticleState.fontColor}
						options={utils.fontColors}
						onChange={updateArticleState('fontColor')}
						title={'Цвет шрифта'}
					/>

					<Separator />

					<Select
						selected={draftArticleState.backgroundColor}
						options={utils.backgroundColors}
						onChange={updateArticleState('backgroundColor')}
						title={'Цвет фона'}
					/>

					<Select
						selected={draftArticleState.contentWidth}
						options={utils.contentWidthArr}
						onChange={updateArticleState('contentWidth')}
						title={'Ширина контента'}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
