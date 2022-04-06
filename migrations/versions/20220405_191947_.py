"""empty message

Revision ID: 6985709517d1
Revises: be413804bfa5
Create Date: 2022-04-05 19:19:47.097517

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '6985709517d1'
down_revision = 'be413804bfa5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('settings', 'created_at')
    op.drop_column('settings', 'updated_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('settings', sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('settings', sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
