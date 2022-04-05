import {PageContainer} from '../PageContainer';
import NewRestaurantForm from '../auth/NewRestaurantForm';

export const NewRestaurant = ({all_settings, all_cuisines}) => {
    return (
        <PageContainer>
            <NewRestaurantForm all_settings={all_settings} all_cuisines={all_cuisines}>
            </NewRestaurantForm>
        </PageContainer>
    )
}
