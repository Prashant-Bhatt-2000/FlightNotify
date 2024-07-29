# Generated by Django 5.0.7 on 2024-07-28 12:51

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=355)),
                ('verification_token', models.UUIDField(blank=True, null=True)),
                ('is_customer', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_verified', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
