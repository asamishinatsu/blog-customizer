import { useEffect, type RefObject } from 'react';

type UseOutsideClickCloseProps = {
	isOpen: boolean;
	rootRef: RefObject<HTMLDivElement>;
	onClose: () => void;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
}: UseOutsideClickCloseProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target;

			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, onClose, rootRef]);
};
