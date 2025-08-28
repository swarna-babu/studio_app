from django.core.management.base import BaseCommand
from studios.models import Category, SubCategory

CATEGORIES = {
    "Studio - Audio": [
        "Song Recording",
        "Dubbing",
        "Stereo Mixing",
        "Surround Mixing",
        "Sfx",
    ],
    "Studio - Video": [
        "Offline Editing",
        "Online Editing",
        "Color Grading",
    ],
    "Shooting": [
        "Shooting Floors",
        "Chromokey Studio",
        "Virtual Studio",
        "Shooting Houses",
        "Other Locations",
    ],
    "Additional Services": [
        "Voice Banks",
        "Editors",
        "Sound Engineers",
    ],
}

class Command(BaseCommand):
    help = 'Seed studio categories and subcategories.'

    def handle(self, *args, **options):
        for cat_name, subcats in CATEGORIES.items():
            category, _ = Category.objects.get_or_create(name=cat_name)
            for subcat_name in subcats:
                SubCategory.objects.get_or_create(category=category, name=subcat_name)
        self.stdout.write(self.style.SUCCESS('Categories and subcategories seeded successfully.'))
