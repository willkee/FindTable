import React from 'react'
import { ReservationCard } from '../ReservationCard'
import { PageContainer } from '../PageContainer'
import { PageWrapper } from '../PageWrapper'

const ProfilePage = () => {
    return (
        <PageWrapper>

        <PageContainer>
            <h1>Profile Page</h1>
            <ReservationCard />
        </PageContainer>
        </PageWrapper>
    )
}

export default ProfilePage
