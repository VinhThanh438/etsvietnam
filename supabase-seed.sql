-- ═══════════════════════════════════════════════════════════════════════════
-- ETS Vietnam — Seed Data
-- Chạy sau khi đã chạy supabase-schema.sql
-- SQL Editor → New query → Paste → Run
-- ═══════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────
-- 1. SITE CONFIG
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO site_config (id, data) VALUES (
  'main',
  '{
    "company": {
      "name": "ETS VN",
      "fullName": "Công ty Cổ phần Môi trường ETS Việt Nam",
      "slogan": "Giải pháp môi trường bền vững cho tương lai",
      "description": "ETS VN chuyên cung cấp các giải pháp xử lý nước thải, nước cấp, khí thải và tư vấn môi trường toàn diện cho các doanh nghiệp, khu công nghiệp và đô thị trên toàn quốc.",
      "phone": "0879 343 999",
      "zaloPhone": "0983436566",
      "email": "ets.congty@gmail.com",
      "address": "Tầng 3, G14 Khu biệt thự ghép Làng quốc tế Thăng Long, Phường Nghĩa Đô, Thành phố Hà Nội, Việt Nam",
      "taxCode": "0108115359",
      "founded": "2018",
      "logo": "/images/logo.jpg",
      "website": "https://etsvietnam.vn",
      "facebook": "https://facebook.com/etsvietnam",
      "zalo": "0901234567",
      "teamImage": "/uploads/projects/1776007905447-dong-phuc-ngan-hang-mb-bank.webp"
    },
    "seo": {
      "defaultTitle": "ETS Việt Nam | Giải pháp Xử lý Nước & Môi trường",
      "titleTemplate": "%s | ETS VN",
      "defaultDescription": "ETS VN chuyên xử lý nước thải, nước cấp, khí thải và tư vấn môi trường. Hơn 15 năm kinh nghiệm, 500+ dự án thành công trên toàn quốc.",
      "siteUrl": "https://etsvietnam.vn",
      "ogImage": "/images/og-default.jpg"
    },
    "stats": [
      {"value": "8+", "label": "Năm kinh nghiệm"},
      {"value": "500+", "label": "Dự án hoàn thành"},
      {"value": "200+", "label": "Khách hàng tin tưởng"},
      {"value": "30+", "label": "Chuyên gia kỹ thuật"}
    ],
    "nav": [
      {"label": "Trang chủ", "href": "/"},
      {"label": "Giới thiệu", "href": "/gioi-thieu"},
      {"label": "Dịch vụ", "href": "/dich-vu"},
      {"label": "Dự án", "href": "/du-an"},
      {"label": "Tin tức", "href": "/tin-tuc"},
      {"label": "Liên hệ", "href": "/lien-he"}
    ],
    "heroSlides": [
      {"id": "1", "image": "/uploads/projects/1776053040814-renewable-energy-engineers-designing-3d-wind-turbine-park.jfif"},
      {"id": "1776007261892", "image": "/uploads/projects/1776052605099-94e47dfa475c78f77a08eca85e42f3c5.jpg"},
      {"id": "1776053048924", "image": "/uploads/projects/1776052722107-water-treatment-plant-editorial-photography_-image-of-river-32336972.jfif"}
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;


-- ─────────────────────────────────────────────────────────────────────────
-- 2. ANALYTICS
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO analytics (id, pageviews, seo_traffic, events, last_updated) VALUES (
  'main', 1949, 420, 25, '2026-04-21T03:14:03.867Z'
)
ON CONFLICT (id) DO UPDATE
  SET pageviews = EXCLUDED.pageviews,
      seo_traffic = EXCLUDED.seo_traffic,
      events = EXCLUDED.events,
      last_updated = EXCLUDED.last_updated;


-- ─────────────────────────────────────────────────────────────────────────
-- 3. PARTNERS
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO partners (id, name, logo, website, sort_order) VALUES
  ('song-ngoc',  'Song Ngoc Construction',       '/images/partners/163227947959-1245x800.png',                   '#', 0),
  ('trung-hau',  'Trung Hau Construction Group',  '/images/partners/Trung-Hau-Construction-Group-720x405-1.jpg', '#', 1),
  ('gree',       'Gree',                          '/images/partners/dieu-hoa-gree-co-tot-khong-18.jpg',          '#', 2),
  ('giza',       'Giza E&C',                      '/images/partners/giza-logo.png',                              '#', 3),
  ('cienco5',    'Cienco 5',                      '/images/partners/ienco5.jpg',                                 '#', 4),
  ('cjsc',       'CJSC',                          '/images/partners/logo1.png',                                  '#', 5),
  ('charmvit',   'Charmvit Tower',                '/images/partners/tai-xuong-1.png',                            '#', 6),
  ('riifo',      'RIIFO',                         '/images/partners/tai-xuong.png',                              '#', 7)
ON CONFLICT (id) DO UPDATE
  SET name = EXCLUDED.name, logo = EXCLUDED.logo,
      website = EXCLUDED.website, sort_order = EXCLUDED.sort_order;


-- ─────────────────────────────────────────────────────────────────────────
-- 4. SERVICES
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO services (id, slug, title, data) VALUES

('xu-ly-nuoc-thai',
 'xu-ly-nuoc-thai',
 'Tư vấn & Cung cấp Giải pháp Công nghệ Môi trường',
 '{
   "icon": "Factory",
   "shortDescription": "Tư vấn, cung cấp giải pháp Công nghệ, Kỹ thuật, Thiết bị xử lý chất thải\nrắn, khí thải, nước thải.",
   "description": "ETS Việt Nam cung cấp dịch vụ tư vấn toàn diện và cung cấp các giải pháp công nghệ, kỹ thuật hiện đại cùng thiết bị chuyên dụng trong lĩnh vực xử lý chất thải rắn, khí thải và nước thải.",
   "features": ["Tư vấn công nghệ xử lý tối ưu","Cung cấp thiết bị chuyên dụng đồng bộ","Kỹ thuật xử lý chất thải rắn & khí thải","Giải pháp nước thải tập trung hiện đại"],
   "color": "green",
   "image": "/uploads/services/1776308220861-1590651167-2049913010-t-v-n-thi-t-k-cung-c-p-gi-i-phap-cong-ngh-k-thu-t-thi-t-b-x-ly-ch-t-th-i-r-n-khi-th-i-n-c-th-i-2-.jpg"
 }'::jsonb),

('xu-ly-nuoc-cap',
 'tu-van-bao-cao-lap-du-an-dau-tu',
 'Tư vấn Lập Dự án & Nghiên cứu Khả thi',
 '{
   "icon": "FileText",
   "shortDescription": "Tư vấn lập dự án đầu tư, báo cáo nghiên cứu khả thi, báo cáo kinh tế kỹ thuật cho các dự án đầu tư trong lĩnh vực môi trường.",
   "description": "Chúng hỗ trợ doanh nghiệp thực hiện các thủ tục pháp lý và chuẩn bị hồ sơ kỹ thuật chuyên sâu cho các dự án đầu tư môi trường.",
   "features": ["Lập dự án đầu tư môi trường chuyên nghiệp","Báo cáo nghiên cứu khả thi (FS) chi tiết","Báo cáo kinh tế kỹ thuật chuẩn quy định","Tư vấn thủ tục pháp lý dự án đầu tư"],
   "color": "blue",
   "image": "/uploads/services/1776308174673-1590651152-1911615614-t-v-n-l-p-d-an-u-t-bao-cao-nghien-c-u-kh-thi-bao-cao-kinh-t-k-thu-t-cho-cac-d-an-u-t-trong-l-nh-v-c-moi-tr-ng.jpg"
 }'::jsonb),

('xu-ly-khi-thai',
 'rd-chuyen-giao-cong-nghe-dot-chat-thai',
 'R&D & Chuyển giao Công nghệ Xử lý Chất thải',
 '{
   "icon": "Zap",
   "shortDescription": " R&D, chuyển giao công nghệ đốt chất thải có/không thu hồi nhiệt … và các công nghệ tái chế, xử lý chất thải tiên tiến khác.",
   "description": "ETS Việt Nam không ngừng nghiên cứu và phát triển (R&D) các công nghệ xử lý chất thải tiên tiến.",
   "features": ["Nghiên cứu công nghệ xử lý tiên tiến (R&D)","Chuyển giao công nghệ đốt thu hồi nhiệt","Giải pháp tái chế chất thải hiện đại","Tối ưu hóa quy trình xử lý rác thải"],
   "color": "amber",
   "image": "/uploads/services/1776307873193-s5.jpg"
 }'::jsonb),

('lo-dot-chat-thai',
 '-nha-thau-thi-cong-cac-cong-trinh-xu-ly-khi-thai-nuoc-thai-chat-thai-ran',
 'Công nghệ Lò đốt & Thu hồi Năng lượng',
 '{
   "icon": "Flame",
   "shortDescription": "Công nghệ lò đốt chất thải sinh hoạt, công nghiệp và y tế tích hợp thu hồi năng lượng.",
   "description": "Cung cấp các dòng lò đốt chất thải chuyên dụng cho rác thải sinh hoạt, rác thải công nghiệp và y tế.",
   "features": ["Lò đốt rác sinh hoạt & công nghiệp quy mô","Hệ thống đốt chất thải y tế chuyên dụng","Công nghệ thu hồi năng lượng (Waste-to-Energy)","Kiểm soát phát thải lò đốt đạt chuẩn"],
   "color": "orange",
   "image": "/uploads/services/1776308194194-1590651138-933712192-nha-th-u-thi-cong-cac-cong-trinh-x-ly-ch-t-th-i-r-n-khi-th-i-n-c-th-i.jpg"
 }'::jsonb),

('tu-van-moi-truong',
 'cung-cap-dich-vu-ky-thuat',
 'Dịch vụ Kỹ thuật & Quản lý Dự án',
 '{
   "icon": "Wrench",
   "shortDescription": "Cung cấp Dịch vụ kỹ thuật: thiết kế, lắp đặt, quản lý dự án, vận hành dự án, bảo hành, bảo trì, sửa chữa,",
   "description": "Cung cấp hệ sinh thái dịch vụ kỹ thuật trọn gói từ khâu thiết kế, lắp đặt đến quản lý và vận hành dự án.",
   "features": ["Thiết kế & Lắp đặt hệ thống trọn gói","Quản lý dự án & Vận hành chuyên nghiệp","Dịch vụ bảo hành & Bảo trì định kỳ","Sửa chữa & Cung cấp linh kiện thay thế"],
   "color": "teal",
   "image": "/uploads/services/1776307583990-1590651131-1374659146-cung-c-p-d-ch-v-k-thu-t-thi-t-k-l-p-t-qu-n-ly-d-an-v-n-hanh-d-an-b-o-hanh-b-o-tri-s-a-ch-a-1.jpg"
 }'::jsonb),

('quan-trac-vinh-thanh',
 'quan-trac',
 'Quan trắc Tự động & Phân tích Hiện trường',
 '{
   "icon": "Activity",
   "shortDescription": "Cung cấp trạm quan trắc tự động liên tục và dịch vụ lấy mẫu phân tích tại hiện trường.",
   "description": "Giải pháp quan trắc môi trường toàn diện với hệ thống trạm tự động, liên tục cho nước thải và khí thải.",
   "features": ["Lắp đặt trạm quan trắc tự động (CEMS)","Dịch vụ lấy mẫu & Phân tích tại chỗ","Hệ thống giám sát dữ liệu online 24/7","Truyền dữ liệu quan trắc về Sở TN&MT"],
   "color": "slate",
   "image": "/uploads/services/1776307169132-1590651120-951023127-quan-tr-c-moi-tr-ng-l-p-bao-cao-quan-tr-c.jpg"
 }'::jsonb),

('van-hanh-bao-tri',
 'tu-van-lap-bao-cao-danh-gia',
 'Tư vấn Hồ sơ Pháp lý Môi trường',
 '{
   "icon": "ShieldCheck",
   "shortDescription": "Tư vấn lập báo cáo đánh giá tác động môi trường, kế hoạch bảo vệ\nmôi trường, các hồ sơ pháp lý và thủ tục về môi trường khác.",
   "description": "Hỗ trợ doanh nghiệp hoàn thiện các thủ tục pháp lý môi trường cần thiết suốt vòng đời dự án.",
   "features": ["Báo cáo Đánh giá tác động môi trường (ĐTM)","Giấy phép & Kế hoạch bảo vệ môi trường","Báo cáo công tác bảo vệ môi trường năm","Tư vấn tuân thủ quy định luật môi trường"],
   "color": "green",
   "image": "/uploads/services/1776308275210-1590651126-558802580-t-v-n-l-p-bao-cao-anh-gia-tac-ng-moi-tr-ng-k-ho-ch-b-o-v-moi-tr-ng-cac-h-s-phap-ly-va-th-t-c-v-moi-tr-ng-khac-2048x713.jpg"
 }'::jsonb)

ON CONFLICT (id) DO UPDATE
  SET slug = EXCLUDED.slug, title = EXCLUDED.title, data = EXCLUDED.data;


-- ─────────────────────────────────────────────────────────────────────────
-- 5. PROJECTS
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO projects (id, slug, title, location, category, featured, data) VALUES

('xay-dung-va-lap-dat-tram-xlnt-tai-du-an-dau-tu-xay-dung-khu-nha-o-tai-xa-dinh-xa-tp-phu-ly-ninh-binh',
 'xay-dung-va-lap-dat-tram-xlnt-tai-du-an-dau-tu-xay-dung-khu-nha-o-tai-xa-dinh-xa-tp-phu-ly-ninh-binh',
 'Xây dựng và lắp đặt trạm XLNT tại dự án Đầu tư Xây dựng khu nhà ở tại xã Đinh Xá, TP Phủ Lý, Ninh Bình',
 'Phủ Lý, Ninh Bình', 'xu-ly-nuoc-thai', true,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"90m³/ngày đêm","year":"2026","image":"","shortDescription":"","description":"","tags":["Xử lý nước thải","Xây dựng","Lắp đặt"]}'::jsonb),

('cai-tao-nang-cap-tram-xu-ly-nuoc-thai-cncc-mulberry-lane-tai-cum-nha-chung-cu-mulberry-lane-phuong-dai-mo-tp-ha-noi',
 'cai-tao-nang-cap-tram-xu-ly-nuoc-thai-cncc-mulberry-lane-tai-cum-nha-chung-cu-mulberry-lane-phuong-dai-mo-tp-ha-noi',
 'Cải tạo, nâng cấp trạm xử lý nước thải CNCC MULBERRY LANE tại cụm nhà chung cư MULBERRY LANE, phường Đại Mỗ, TP. Hà Nội',
 'Hà Nội', 'xu-ly-nuoc-thai', true,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"750m³/ngày","year":"2026","image":"","shortDescription":"","description":"Cải tạo, nâng cấp trạm xử lý nước thải CNCC MULBERRY LANE công suất 720m3/ngày, dự phòng 180m3/ngày","tags":["Xử lý nước thải","Cải tạo","Nâng cấp","CNCC MULBERRRY"]}'::jsonb),

('thi-cong-lap-dat-tram-xlnt-thuoc-cum-khu-cong-nghiep-binh-xuyen-cho-cac-nha-may-accton-nha-may-art',
 'thi-cong-lap-dat-tram-xlnt-thuoc-cum-khu-cong-nghiep-binh-xuyen-cho-cac-nha-may-accton-nha-may-art',
 'Thi công, lắp đặt trạm XLNT thuộc cụm khu công nghiệp Bình Xuyên cho các nhà máy ACCTON, nhà máy ART',
 'Khu CN Bình Xuyên', 'xu-ly-nuoc-thai', true,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"","year":"2026","image":"","shortDescription":"","description":"Thi công, lắp đặt trạm xử lý nước thải thuộc cụm khu công nghiệp Bình Xuyên cho các nhà máy ACCTON, nhà máy ART","tags":["Xử lý nước thải","Lắp đặt","Thi công"]}'::jsonb),

('thi-cong-tram-xu-ly-nuoc-thai-sinh-hoat-tai-khu-nha-o-pho-moi-van-giang-vaquarius-hung-yen',
 'thi-cong-tram-xu-ly-nuoc-thai-sinh-hoat-tai-khu-nha-o-pho-moi-van-giang-vaquarius-hung-yen',
 'Thi công trạm xử lý nước thải sinh hoạt tại khu nhà ở phố mới Văn Giang - Vaquarius - Hưng Yên',
 'Hưng Yên', 'xu-ly-nuoc-thai', false,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"500m³/24h","year":"2025","image":"","shortDescription":"","description":"","tags":["Xử lý nước thải"]}'::jsonb),

('cung-cap-va-lap-dat-tram-xlnt-cho-du-an-the-charm-khu-do-thi-an-hung-ha-dong-ha-noi',
 'cung-cap-va-lap-dat-tram-xlnt-cho-du-an-the-charm-khu-do-thi-an-hung-ha-dong-ha-noi',
 'Cung cấp và lắp đặt trạm XLNT cho Dự án THE CHARM - KHU ĐÔ THỊ AN HƯNG - HÀ ĐÔNG - HÀ NỘI',
 'Hà Đông', 'xu-ly-nuoc-thai', false,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"600m³/ngày đêm","year":"2025","image":"","shortDescription":"","description":"","tags":["Xử lý nước thải","Lắp đặt"]}'::jsonb),

('cai-tao-va-van-hanh-tram-xlnt-tai-du-an-xay-dung-dai-hoc-hoa-lu-ninh-binh',
 'cai-tao-va-van-hanh-tram-xlnt-tai-du-an-xay-dung-dai-hoc-hoa-lu-ninh-binh',
 'Cải tạo và vận hành trạm XLNT tại dự án xây dựng Đại Học Hoa Lư, Ninh Bình',
 'Hoa Lư, Ninh Bình', 'xu-ly-nuoc-thai', false,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"350m³/ngày đêm","year":"2025","image":"","shortDescription":"","description":"","tags":["Xử lý nước thải"]}'::jsonb),

('cung-cap-va-lap-dat-hoan-thien-he-thong-tram-xu-ly-nuoc-thai-tai-du-an-trung-tam-dieu-hanh-tac-chien-xuat-nhap-canh-a08-phuong-yen-hoa-tp-ha-noi',
 'cung-cap-va-lap-dat-hoan-thien-he-thong-tram-xu-ly-nuoc-thai-tai-du-an-trung-tam-dieu-hanh-tac-chien-xuat-nhap-canh-a08-phuong-yen-hoa-tp-ha-noi',
 'Cung cấp và lắp đặt hoàn thiện hệ thống Trạm xử lý nước thải tại Dự án Trung tâm điều hành, tác chiến xuất nhập cảnh (A08), phường Yên Hoà TP. Hà nội',
 'Hà Nội', 'xu-ly-nuoc-thai', false,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"","year":"2025","image":"","shortDescription":"","description":"","tags":["Xử lý nước thải"]}'::jsonb),

('du-an-xu-ly-nuoc-thai-da-phuoc',
 'du-an-xu-ly-nuoc-thai-da-phuoc',
 'Dự án xử lý nước thải Đa Phước',
 'Đa Phước', 'xu-ly-nuoc-thai', false,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"","year":" ","image":"/uploads/projects/1776220723037-1590549029-2116639361-d-an-x-ly-n-c-th-i-a-ph-c-768x511.jpg","shortDescription":"","description":"","tags":["Xử lý nước thải"]}'::jsonb),

('du-an-trung-tam-y-te-huyen-don-duong-lam-dong',
 'du-an-trung-tam-y-te-huyen-don-duong-lam-dong',
 'Dự án Trung Tâm Y Tế huyện Đơn Dương, Lâm Đồng',
 'Lâm Đồng', 'xu-ly-nuoc-thai', false,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"","year":" ","image":"/uploads/projects/1776220804366-1590549111-1808067169-d-an-ttyt-huy-n-n-d-ng-ndash-lam-ng.jpg","shortDescription":"","description":"","tags":[]}'::jsonb),

('du-an-xlnt-huyen-duc-trong-lam-dong',
 'du-an-xlnt-huyen-duc-trong-lam-dong',
 'Dự án XLNT huyện Đức Trọng, Lâm Đồng',
 'Lâm Đồng', 'xu-ly-nuoc-thai', false,
 '{"client":"","categoryLabel":"Xử lý nước thải","capacity":"","year":" ","image":"/uploads/projects/1776221083256-brave_screenshot_etsvietnam.vn.png","shortDescription":"","description":"Dự án xử lý nước thải huyện Đức Trọng – Lâm Đồng.","tags":["Xử lý nước thải"]}'::jsonb),

('tu-van-thiet-ke-quan-ly-du-an-lo-dot-chat-thai-nguy-hai-cho-cong-ty-co-phan-co-dien-moi-truong-lilama',
 'tu-van-thiet-ke-quan-ly-du-an-lo-dot-chat-thai-nguy-hai-cho-cong-ty-co-phan-co-dien-moi-truong-lilama',
 'Tư vấn thiết kế, quản lý dự án lò đốt chất thải nguy hại cho Công ty Cổ phần Cơ - Điện - Môi trường Lilama',
 '', 'xu-ly-khi-thai', false,
 '{"client":"Công ty Cổ phần Cơ - Điện - Môi trường Lilama","categoryLabel":"Xử lý khí thải","capacity":"500kg/h","year":" ","image":"/uploads/projects/1776221349179-brave_screenshot_etsvietnam.vn-1-.png","shortDescription":"","description":"Tư vấn thiết kế, quản lý dự án lò đốt chất thải nguy hại, công suất 500 kg/h cho Công ty Cổ phần Cơ – Điện – Môi trường Lilama","tags":["Xử lý khí thải","Tư vấn môi trường"]}'::jsonb)

ON CONFLICT (id) DO UPDATE
  SET slug = EXCLUDED.slug, title = EXCLUDED.title, location = EXCLUDED.location,
      category = EXCLUDED.category, featured = EXCLUDED.featured, data = EXCLUDED.data;


-- ─────────────────────────────────────────────────────────────────────────
-- 6. NEWS
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO news (id, slug, title, category, featured, published_at, data) VALUES

('cong-nghe-xu-ly-nuoc-thai-mbr',
 'cong-nghe-xu-ly-nuoc-thai-mbr',
 'Công nghệ MBR trong xử lý nước thải: Ưu điểm và ứng dụng',
 'cong-nghe', true, '2024-03-15',
 '{
   "excerpt": "Màng lọc sinh học MBR (Membrane Bioreactor) đang được ứng dụng rộng rãi trong xử lý nước thải công nghiệp và đô thị nhờ hiệu quả vượt trội so với công nghệ truyền thống.",
   "content": "# Công nghệ MBR trong xử lý nước thải\n\nMBR (Membrane Bioreactor) là công nghệ kết hợp giữa quá trình xử lý sinh học hiếu khí và màng lọc vi lọc/siêu lọc...",
   "author": "Admin",
   "categoryLabel": "Công nghệ",
   "image": "/uploads/news/1776222546943-cong-nghe-mbr.webp",
   "readingTime": "8 phút",
   "tags": ["MBR","Công nghệ xử lý","Màng lọc"]
 }'::jsonb),

('tai-sao-phai-quan-ly-xu-ly-chat-thai-nguy-hai-chuyen-biet',
 'tai-sao-phai-quan-ly-xu-ly-chat-thai-nguy-hai-chuyen-biet',
 'Tại sao phải quản lý, xử lý chất thải nguy hại chuyên biệt?',
 'tin-tuc', true, '2026-04-15',
 '{
   "excerpt": "Trong số các chất thải tác động xấu đến môi trường phải kể đến chất thải nguy hại – một loại chất thải phát sinh ngày càng nhiều bởi quá trình sản xuất công nghiệp.",
   "content": "Trong số các chất thải tác động xấu đến môi trường phải kể đến chất thải nguy hại...",
   "author": "Admin",
   "categoryLabel": "Tin tức",
   "image": "/uploads/news/1776243748741-phan-loai-va-xu-ly-chat-thai-y-te-nguy-hai-theo-quy-dinh-3-.webp",
   "readingTime": "5 phút",
   "tags": ["Xử lý chất thải","Môi trường"]
 }'::jsonb),

('xu-ly-nuoc-cap',
 'xu-ly-nuoc-cap',
 'Xử lý nước cấp',
 'tin-tuc', true, '2026-04-15',
 '{
   "excerpt": "Nước cấp, là nguồn nước ngầm sau khi qua hệ thống xử lý của các nhà máy sẽ được cấp đến các khu dân cư để phục vụ cho cuộc sống sinh hoạt hằng ngày của người dân.",
   "content": "## Nước cấp và đặc tính nguồn nước ngầm\n\nNước cấp là nguồn nước ngầm sau khi qua hệ thống xử lý...",
   "author": "Admin",
   "categoryLabel": "Tin tức",
   "image": "/uploads/news/1776226493740-tn_484x354_b6c5c9c06892fb2462b6a53e41501faa_ct11.jpg",
   "readingTime": "5 phút",
   "tags": ["Xử lý nước cấp","Môi trường"]
 }'::jsonb),

('nghi-dinh-45-2022-xu-phat-vi-pham-moi-truong',
 'nghi-dinh-45-2022-xu-phat-vi-pham-moi-truong',
 'Nghị định 45/2022/NĐ-CP: Những điểm mới về xử phạt vi phạm môi trường',
 'phap-luat', false, '2026-04-15',
 '{
   "excerpt": "Nghị định 45/2022/NĐ-CP với nhiều thay đổi quan trọng về mức xử phạt vi phạm hành chính trong lĩnh vực bảo vệ môi trường, đặc biệt là các hành vi xả thải trái phép.",
   "content": "# Nghị định 45/2022/NĐ-CP về xử phạt vi phạm hành chính lĩnh vệ bảo vệ môi trường\n\nNghị định 45/2022/NĐ-CP được Chính phủ ban hành ngày 07/07/2022...",
   "author": "Admin",
   "categoryLabel": "Pháp luật",
   "image": "/uploads/news/1776243150944-9999999999-1680858476148192726189-0-0-313-500-crop-1680858487504134567778320240827151100.webp",
   "readingTime": "6 phút",
   "tags": ["Pháp luật","Nghị định 45","Môi trường"]
 }'::jsonb),

('quy-trinh-xu-ly-nuoc-thai-cong-nghiep-dat-chuan',
 'quy-trinh-xu-ly-nuoc-thai-cong-nghiep-dat-chuan',
 'Quy trình xử lý nước thải công nghiệp đạt chuẩn QCVN 40:2011/BTNMT',
 'kien-thuc', false, '2026-04-15',
 '{
   "excerpt": "Việc tuân thủ QCVN 40:2011/BTNMT là yêu cầu bắt buộc đối với mọi cơ sở sản xuất. Tìm hiểu quy trình xử lý nước thải công nghiệp tiêu chuẩn.",
   "content": "# Quy trình xử lý nước thải công nghiệp đạt chuẩn QCVN 40:2011/BTNMT\n\nXử lý nước thải công nghiệp là một quá trình phức tạp...",
   "author": "Admin",
   "categoryLabel": "Kiến thức",
   "image": "/uploads/news/1776243227072-06-qcvn-40-2011-btnmt-1.webp",
   "readingTime": "7 phút",
   "tags": ["Xử lý nước thải","Công nghiệp","QCVN 40"]
 }'::jsonb),

('tam-quan-trong-bao-tri-he-thong-xu-ly-nuoc',
 'tam-quan-trong-bao-tri-he-thong-xu-ly-nuoc',
 'Tại sao cần bảo trì hệ thống xử lý nước thải định kỳ?',
 'kien-thuc', false, '2026-04-15',
 '{
   "excerpt": "Bảo trì định kỳ không chỉ giúp kéo dài tuổi thọ thiết bị mà còn đảm bảo chất lượng nước đầu ra luôn ổn định, tránh rủi ro sự cố kỹ thuật.",
   "content": "# Tầm quan trọng của việc bảo trì hệ thống xử lý nước thải định kỳ\n\nNhiều doanh nghiệp sau khi lắp đặt hệ thống xử lý nước thải thường bỏ qua khâu bảo trì...",
   "author": "Admin",
   "categoryLabel": "Kiến thức",
   "image": "/uploads/news/1776225571342-hinhanh-7-1024x682-1-768x512.jpg",
   "readingTime": "5 phút",
   "tags": ["Bảo trì","Hệ thống xử lý","Vận hành"]
 }'::jsonb),

('cac-phuong-phap-xu-ly-sat-mangan-canxi-trong-nuoc',
 'cac-phuong-phap-xu-ly-sat-mangan-canxi-trong-nuoc',
 'Các phương pháp xử lý Sắt, Mangan và Canxi trong nguồn nước cấp',
 'kien-thuc', false, '2026-04-15',
 '{
   "excerpt": "Nguồn nước ngầm tại Việt Nam thường bị nhiễm kim loại nặng. Khám phá các công nghệ tiên tiến nhất để loại bỏ Sắt, Mangan và xử lý độ cứng hiệu quả.",
   "content": "# Các phương pháp xử lý Sắt, Mangan và Canxi trong nguồn nước cấp\n\nSắt, Mangan và Canxi (độ cứng) là những thành phần phổ biến nhất...",
   "author": "Admin",
   "categoryLabel": "Kiến thức",
   "image": "/uploads/news/1776243357745-can-can-xiitrong-nuoc-1.webp",
   "readingTime": "6 phút",
   "tags": ["Xử lý nước cấp","Lọc nước","Kim loại nặng"]
 }'::jsonb),

('dich-vu-tu-van-moi-truong-tron-goi-ets-vn',
 'dich-vu-tu-van-moi-truong-tron-goi-ets-vn',
 'Dịch vụ tư vấn môi trường trọn gói: Từ hồ sơ pháp lý đến vận hành',
 'tin-tuc', false, '2026-04-15',
 '{
   "excerpt": "ETS Việt Nam cung cấp giải pháp tổng thể giúp doanh nghiệp hoàn thiện hồ sơ môi trường, thiết kế thi công và vận hành hệ thống đạt chuẩn.",
   "content": "# Dịch vụ tư vấn môi trường trọn gói: Giải pháp an tâm cho doanh nghiệp\n\nTrong bối cảnh quy định về bảo vệ môi trường ngày càng thắt chặt...",
   "author": "Admin",
   "categoryLabel": "Tin tức",
   "image": "/uploads/news/1776243285642-water-treatment-plant-editorial-photography_-image-of-river-32336972.jfif",
   "readingTime": "5 phút",
   "tags": ["Tư vấn môi trường","Hồ sơ pháp lý","Dịch vụ trọn gói"]
 }'::jsonb),

('cong-nghe-xu-ly-khi-thai-pho-bien',
 'cong-nghe-xu-ly-khi-thai-pho-bien',
 'Các công nghệ xử lý khí thải phổ biến cho nhà máy sản xuất',
 'cong-nghe', false, '2026-04-15',
 '{
   "excerpt": "Bụi và khí độc là vấn đề đau đầu của các khu công nghiệp. Tìm hiểu về tháp hấp phụ, tháp lọc ướt và hệ thống lọc bụi túi vải trong xử lý khí thải.",
   "content": "# Các công nghệ xử lý khí thải phổ biến cho nhà máy sản xuất\n\nKhí thải công nghiệp chứa nhiều thành phần độc hại...",
   "author": "Admin",
   "categoryLabel": "Công nghệ",
   "image": "/uploads/news/1776243470792-thiet-bi-he-thong-xu-ly-khi-thai-cong-nghiep-tai-bac-ninh-bac-giang-scaled.webp",
   "readingTime": "7 phút",
   "tags": ["Xử lý khí thải","Công nghiệp","Công nghệ"]
 }'::jsonb),

('tam-quan-trong-esg-quan-ly-moi-truong',
 'tam-quan-trong-esg-quan-ly-moi-truong',
 'Tầm quan trọng của ESG trong quản trị doanh nghiệp hiện đại',
 'tin-tuc', false, '2026-04-16',
 '{
   "excerpt": "ESG (Environmental, Social, and Governance) không còn là khái niệm xa lạ. Tìm hiểu tại sao quản trị môi trường là trụ cột quan trọng nhất trong chiến lược ESG.",
   "content": "# Tầm quan trọng của ESG trong quản trị doanh nghiệp hiện đại\n\nESG là bộ tiêu chuẩn để đo lường các yếu tố liên quan đến phát triển bền vững...",
   "author": "Admin",
   "categoryLabel": "Tin tức",
   "image": "/uploads/news/1776311137878-esg-da-tro-thanh-tru-cot-trong-chien-luoc-phat-trien-ben-vung-cua-doanh-nghiep.webp",
   "readingTime": "6 phút",
   "tags": ["ESG","Bền vững","Quản trị"]
 }'::jsonb),

('phuong-phap-fenton-xu-ly-nuoc-thai-kho-phan-huy',
 'phuong-phap-fenton-xu-ly-nuoc-thai-kho-phan-huy',
 'Ứng dụng phương pháp Fenton trong xử lý nước thải khó phân hủy sinh học',
 'cong-nghe', false, '2026-04-16',
 '{
   "excerpt": "Fenton là quá trình oxy hóa nâng cao (AOPs) cực kỳ hiệu quả đối với các loại nước thải chứa hợp chất hữu cơ phức tạp như dệt nhuộm, dược phẩm.",
   "content": "# Ứng dụng phương pháp Fenton trong xử lý nước thải\n\nĐối với các loại nước thải có nồng độ chất hữu cơ cao và khó phân hủy...",
   "author": "Admin",
   "categoryLabel": "Công nghệ",
   "image": "/uploads/news/1776311314539-brave_screenshot_microbelift.vn.png",
   "readingTime": "8 phút",
   "tags": ["Fenton","Oxy hóa nâng cao","Xử lý hóa lý"]
 }'::jsonb),

('huong-dan-phan-loai-rac-thai-nguon-2024',
 'huong-dan-phan-loai-rac-thai-nguon-2024',
 'Hướng dẫn phân loại rác thải tại nguồn theo quy định mới nhất',
 'tin-tuc', false, '2026-04-16',
 '{
   "excerpt": "Từ ngày 31/12/2024, việc phân loại rác thải tại nguồn sẽ trở thành bắt buộc. Hãy cùng tìm hiểu cách phân loại đúng để tránh bị xử phạt.",
   "content": "# Hướng dẫn phân loại rác thải tại nguồn\n\nLuật Bảo vệ Môi trường 2020 quy định việc phân loại chất thải rắn sinh hoạt là nghĩa vụ của mọi cá nhân, hộ gia đình và tổ chức.",
   "author": "Admin",
   "categoryLabel": "Tin tức",
   "image": "/uploads/news/1776311386753-e9380cc241970a54fa86e0f36cffa3e9.webp",
   "readingTime": "5 phút",
   "tags": ["Phân loại rác","Môi trường","Luật BVMT"]
 }'::jsonb),

('cong-nghe-say-bun-thai-re-su-dung',
 'cong-nghe-say-bun-thai-re-su-dung',
 'Công nghệ sấy bùn thải và hướng tái sử dụng trong nông nghiệp',
 'cong-nghe', false, '2026-04-16',
 '{
   "excerpt": "Bùn thải từ các trạm xử lý nước thải không còn là chất thải bỏ đi nếu được xử lý đúng cách bằng công nghệ sấy và tiệt trùng.",
   "content": "# Công nghệ sấy bùn thải và hướng tái sử dụng\n\nQuản lý bùn thải là thách thức lớn đối với các nhà máy...",
   "author": "Admin",
   "categoryLabel": "Công nghệ",
   "image": "/uploads/news/1776311459223-huowng-dan-lua-chon-he-thong-xu-ly-nuoc-thai-nganh-go-768x576.jpg",
   "readingTime": "7 phút",
   "tags": ["Sấy bùn","Tái chế","Nông nghiệp"]
 }'::jsonb),

('quan-trac-khi-thai-tu-dong-tt10-2021',
 'quan-trac-khi-thai-tu-dong-tt10-2021',
 'Quan trắc khí thải tự động: Tuân thủ Thông tư 10/2021/TT-BTNMT',
 'phap-luat', false, '2026-04-16',
 '{
   "excerpt": "Các cơ sở sản xuất có lưu lượng phát thải lớn bắt buộc phải lắp đặt trạm quan trắc tự động liên tục. Cùng nắm rõ các yêu cầu kỹ thuật mới nhất.",
   "content": "# Quan trắc khí thải tự động: Giải pháp tuân thủ pháp luật\n\nThông tư 10/2021/TT-BTNMT quy định chi tiết về kỹ thuật quan trắc môi trường...",
   "author": "Admin",
   "categoryLabel": "Pháp luật",
   "image": "/uploads/news/1776311552465-s-nh-tr-m-scan.webp",
   "readingTime": "6 phút",
   "tags": ["Quan trắc tự động","Thông tư 10","Khí thải"]
 }'::jsonb),

('tai-su-dung-nuoc-thai-cho-tuoi-tieu',
 'tai-su-dung-nuoc-thai-cho-tuoi-tieu',
 'Lợi ích và quy chuẩn khi tái sử dụng nước thải cho mục đích tưới tiêu',
 'tin-tuc', false, '2026-04-16',
 '{
   "excerpt": "Trong bối cảnh khan hiếm tài nguyên nước, việc tái sử dụng nước thải sau xử lý cho mục đích nông nghiệp là giải pháp bền vững và kinh tế.",
   "content": "# Tái sử dụng nước thải cho mục đích tưới tiêu\n\nNước thải sau khi qua hệ thống xử lý đạt chuẩn có thể trở thành nguồn tài nguyên quý giá...",
   "author": "Admin",
   "categoryLabel": "Tin tức",
   "image": "/uploads/news/1776311597272-e504863a859513bf176779b592ffdc8c.webp",
   "readingTime": "5 phút",
   "tags": ["Tái sử dụng nước","Tưới tiêu","Nông nghiệp"]
 }'::jsonb)

ON CONFLICT (id) DO UPDATE
  SET slug = EXCLUDED.slug, title = EXCLUDED.title, category = EXCLUDED.category,
      featured = EXCLUDED.featured, published_at = EXCLUDED.published_at, data = EXCLUDED.data;


-- ─────────────────────────────────────────────────────────────────────────
-- Done!
-- ─────────────────────────────────────────────────────────────────────────
-- Kiểm tra kết quả:
-- SELECT 'projects' as tbl, count(*) FROM projects
-- UNION ALL SELECT 'news',      count(*) FROM news
-- UNION ALL SELECT 'services',  count(*) FROM services
-- UNION ALL SELECT 'partners',  count(*) FROM partners
-- UNION ALL SELECT 'analytics', count(*) FROM analytics
-- UNION ALL SELECT 'site_config',count(*) FROM site_config;
