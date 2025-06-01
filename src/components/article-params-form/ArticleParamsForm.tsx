import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	setCurrentState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	setCurrentState,
}: ArticleParamsFormProps) => {
	const [opened, setOpened] = useState(false);
	const [selectState, setSelectState] =
		useState<ArticleStateType>(currentState);

	const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setCurrentState(selectState);
	};

	const onReset = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setSelectState(defaultArticleState);
		setCurrentState(defaultArticleState);
	};

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectState({ ...selectState, [key]: value });
	};

	return (
		<>
			<ArrowButton isOpen={opened} onClick={() => setOpened(!opened)} />
			<aside
				className={clsx(styles.container, opened && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<h2 className={styles.title}>Задайте параметры</h2>

					<Select
						selected={selectState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option: OptionType) =>
							handleChange('fontFamilyOption', option)
						}
						title='Шрифт'
					/>

					<RadioGroup
						selected={selectState.fontSizeOption}
						name='radio'
						onChange={(option: OptionType) =>
							handleChange('fontSizeOption', option)
						}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>

					<Select
						selected={selectState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={selectState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>

					<Select
						selected={selectState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
