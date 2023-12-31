import {Box} from '@chakra-ui/react';
import {useEffect, useCallback, useContext} from 'react';
import {UserContext} from '../../context/user';
import {IUserContext} from '../../interfaces';

interface IClickAwayMenuProps {
    handleMenuOpen: (open: boolean, name?: string) => void;
    menuName?: string;
    top?: string | string[];
    left?: string | string[];
    right?: string | string[];
    bottom?: string | string[];
    triggerRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    minH?: string;
    width?: string;
    menuRef: React.RefObject<HTMLDivElement>;
}

const ClickAwayMenu = ({
    menuName = '',
    handleMenuOpen,
    top = 'unset',
    left = 'unset',
    right = 'unset',
    bottom = 'unset',
    triggerRef,
    children,
    minH = '150px',
    width = '220px',
    menuRef,
}: IClickAwayMenuProps) => {
    const {user, nonAuthTheme} = useContext(UserContext) as IUserContext;
    const clickAway = useCallback(
        (e: MouseEvent) => {
            const target = e.target as Element;
            if (menuRef.current !== null && triggerRef !== null) {
                if (!menuRef.current.contains(target) && !triggerRef?.current?.contains(target)) {
                    handleMenuOpen(false, menuName);
                }
            }
        },
        [handleMenuOpen, triggerRef]
    );

    useEffect(() => {
        window.addEventListener('click', clickAway);
        return () => window.removeEventListener('click', clickAway);
    }, []);

    return (
        <Box
            borderRadius={8}
            ref={menuRef}
            color="text.primary"
            zIndex={10}
            pos="absolute"
            top={top}
            right={right}
            left={left}
            bottom={bottom}
            minH={minH}
            width={width}
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            bg={user.theme === 'dark' || nonAuthTheme === 'dark' ? 'cover.primary' : 'light.primary'}
        >
            {children}
        </Box>
    );
};

export default ClickAwayMenu;
