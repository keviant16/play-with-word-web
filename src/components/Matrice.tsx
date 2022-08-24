
import { MatriceItem } from './MatriceItem';

const Matrice: React.FC = () => {
    const size = 30
    for (let index = 0; index < size; index++) {
        console.log(index);

        return (
            <MatriceItem />
        );
    }
    return null

};

export default Matrice;
