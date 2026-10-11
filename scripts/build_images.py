"""Copy the curated photos from the client's asset folders into public/images.

Only photos in which Badri Raj Timalsina is visible are used on the site.

Each photo is auto-rotated, stripped of metadata and written twice:
  <name>.jpg     long edge <= 1920px  (heroes, lightboxes)
  <name>-md.jpg  long edge <= 960px   (cards, grids, thumbnails)

Run: python scripts/build_images.py
"""
import os
from PIL import Image, ImageOps
import pillow_heif  # pip install pillow-heif — the client's iPhone originals are HEIC

pillow_heif.register_heif_opener()

ROOT = "D:/fuzon-corp"
WA1 = "safalbadri/image-assets/WhatsApp Unknown 2026-10-02 at 10.41.42 AM/"
WA2 = "safalbadri/image-assets/WhatsApp Unknown 2026-10-02 at 10.44.58 AM/"
WA3 = "safalbadri/image-assets/WhatsApp Unknown 2026-10-02 at 10.48.35 AM/"
# Second batch from the client, kept outside public/ (originals are ~135 MB).
SRC = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "source-photos")) + "/"

PHOTOS = {
    # Badri — field photos from the first batch
    "badri/studio": "badri1/public/badri5.jpeg",
    "badri/community-meeting": WA2 + "WhatsApp Image 2026-10-01 at 9.33.39 PM (1).jpeg",
    "badri/chiwang-selfie": WA2 + "WhatsApp Image 2026-10-01 at 9.33.43 PM (1).jpeg",
    "badri/with-students": WA3 + "WhatsApp Image 2026-09-30 at 8.33.04 PM.jpeg",
    # Badri — portraits and travels (second batch, all 43 used)
    "badri/hero-clean": SRC + "herosection-clean.png",  # home hero: client-supplied 16:9 version, background extended and people removed
    "badri/early-years": SRC + "05261C68-4B10-4204-B3B5-3258F3830B9A.JPG.jpeg",
    "badri/early-community": SRC + "09346A27-E530-4BB4-A15C-9CEED0AC2775.JPG.jpeg",
    "badri/niagara": SRC + "21A4A350-7F90-4606-A58A-414208620652.HEIC",
    "badri/early-stage": SRC + "25DBF197-0185-491A-A065-ABA98B281322.JPG.jpeg",
    "badri/early-portrait": SRC + "2C62F4CE-EE2C-4BE5-9661-B1367D7AEFC5.HEIC",
    "badri/beverly-hills": SRC + "324A833F-659B-42FF-ADC2-44DF48B59B37.HEIC",
    "badri/dhaka-topi-yellow": SRC + "33262379-A865-4164-A9F3-00929832416F.JPG.jpeg",
    "badri/chairman-desk": SRC + "4585720E-EFD3-43EE-AC83-BFBFDF63771E.HEIC",
    "badri/coca-cola": SRC + "4E4255D9-917B-4E6D-B6A4-09307792A80D.HEIC",
    "badri/nepal-flag": SRC + "54EE0F31-2E8D-44F2-B249-5BB4DD498B17.JPG.jpeg",
    "badri/lake-tahoe": SRC + "55EB4BC5-4E93-49BF-BF67-1AFED40A1B41.HEIC",
    "badri/fnj-kavre": SRC + "5A0A09F4-712B-4504-9ABE-95B23124156C.HEIC",
    "badri/yellow-jacket": SRC + "5CB3405C-633A-447C-9EB5-1FDC34B937AE.HEIC",
    "badri/maserati": SRC + "65958487-9A5A-4F35-9276-AB73477805D3.HEIC",
    "badri/portrait-namaste": SRC + "680FA723-39AB-4369-8C5D-C199C259E204.JPG.jpeg",
    "badri/portrait-office": SRC + "68174C87-A318-48A6-968F-4E508186F4EF.JPG.jpeg",
    "badri/dhaka-topi": SRC + "6CA4A9F5-820F-44B2-A532-F8139F896388.HEIC",
    "badri/vessel-nyc": SRC + "70CA6890-3C1E-4E30-A386-2EF500E3B064.HEIC",
    "badri/niagara-night": SRC + "73638D80-441E-4AA0-A0C1-5C5995B0B4EB.HEIC",
    "badri/portrait-coat": SRC + "785BCB1B-0851-4EDA-ACA3-62D17F592511.HEIC",
    "badri/portrait-coat-standing": SRC + "843879CB-DA3A-4E75-9DE4-149897AACE94.HEIC",
    "badri/mumbai": SRC + "8AEA03EA-DA2C-479D-BF51-F609F553E5A9.JPG.jpeg",
    "badri/universal-studios": SRC + "8CDCB1DB-28C5-471B-B133-4073DD6B7DDF.HEIC",
    "badri/statue-of-liberty": SRC + "951A6E99-7ADD-40CA-BD31-D9272D46D5F4.HEIC",
    "badri/pashupatinath-usa": SRC + "A01780B9-4A23-4F2C-9EA4-17B6918BCD2E.HEIC",
    "badri/statue-of-liberty-2": SRC + "A3E241EF-2943-4EF8-819E-1C37B673E729.HEIC",
    "badri/young-portrait": SRC + "A5827F90-BA56-4C78-A1FD-0C36AB126241.JPG.jpeg",
    "badri/white-house": SRC + "C148BCB3-6A5F-442A-8F66-36D4BE7C5D09.HEIC",
    "badri/portrait-red-tie": SRC + "D1832123-8BB8-48E9-BC88-32470A8EB774.HEIC",
    "badri/portrait-coat-long": SRC + "D4B1DB47-413C-4DE3-93B0-27E455ADBF41.HEIC",
    "badri/casual": SRC + "D4E4594C-F0BE-4BC0-B101-906C0228AA27.JPG.jpeg",
    "badri/cnn-center": SRC + "D8423659-56E3-4043-B742-75582364B081.HEIC",
    "badri/portrait-check": SRC + "DA1A4FDE-B466-47BD-93F1-559FC173C233.JPG.jpeg",
    "badri/white-house-fence": SRC + "DBE9DFBE-7CD0-4F30-A11B-2CF75847099D.HEIC",
    "badri/portrait-seated": SRC + "E2F370BC-D37F-4C1C-B16B-327CE74ECDF2.JPG.jpeg",
    "badri/wwii-memorial": SRC + "E69A70A1-E5C2-4351-BD19-D032382C5029.HEIC",
    "badri/honolulu": SRC + "E808080A-C6A8-4E37-9E4F-65EE25C4C60F.HEIC",
    "badri/cnn-selfie": SRC + "EE0D9C65-C158-46D7-9B84-1625524686C2.HEIC",
    "badri/portrait-blue": SRC + "F14F4D4D-D104-4C38-B30E-BF175FDE4E88.JPG.jpeg",
    "badri/with-friends": SRC + "F311421B-8927-4142-84B9-D6E51367C1D0.JPG.jpeg",
    "badri/portrait-desk": SRC + "F64109CB-6874-4D9D-A7B0-E4F02FF6F422.JPG.jpeg",
    "badri/portrait-teal": SRC + "IMG_5239.JPG.jpeg",
    "badri/portrait-teal-2": SRC + "IMG_5337.JPG.jpeg",
}

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")


def save(im, path, edge):
    im = im.copy()
    im.thumbnail((edge, edge), Image.LANCZOS)
    im.save(path, "JPEG", quality=80, optimize=True, progressive=True)


def main():
    for name, src in PHOTOS.items():
        im = ImageOps.exif_transpose(Image.open(os.path.join(ROOT, src)))
        if im.mode in ("RGBA", "LA", "P"):
            bg = Image.new("RGB", im.size, "white")
            rgba = im.convert("RGBA")
            bg.paste(rgba, mask=rgba.split()[-1])
            im = bg
        else:
            im = im.convert("RGB")
        base = os.path.join(OUT, name)
        os.makedirs(os.path.dirname(base), exist_ok=True)
        save(im, base + ".jpg", 1920)
        save(im, base + "-md.jpg", 960)
        print(f"{name:34s} {im.size[0]}x{im.size[1]}")


if __name__ == "__main__":
    main()
