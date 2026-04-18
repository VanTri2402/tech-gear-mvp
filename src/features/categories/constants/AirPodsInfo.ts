export const menuAirPodsInfo = [
  {
    title: "Tính Năng Chính",
    imageUrl:
      "https://images.unsplash.com/photo-1568096534861-44f8f9556584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
    immersiveFeatures: [
      {
        title: "Kiểm Soát Tiếng Ồn",
        subtitle: "Chặn thế giới xung quanh",
        description:
          "Chống ồn chủ động, chế độ trong suốt và âm thanh thích ứng giúp tập trung, kết nối, thư giãn.",
        imageUrl:
          "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kcyUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=800", // Found relevant image for noise control/AirPods Pro
      },
      {
        title: "Âm Thanh Không Gian",
        subtitle: "Trải nghiệm nghe độc đáo",
        description: "Theo dõi đầu động, Dolby Atmos bao quanh âm thanh.",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1661779586447-fd6f64c795b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600", // Found relevant image for listening experience
      },
      {
        title: "Nhận Biết Cuộc Trò Chuyện",
        subtitle: "AirPods lắng nghe",
        description:
          "Tự động hạ âm lượng và nâng cao giọng nói người nói chuyện.",
        imageUrl:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbnZlcnNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=800", // Found generic conversation image
      },
      {
        title: "Cách Ly Giọng Nói",
        subtitle: "Cuộc gọi rõ ràng hơn",
        description: "Machine learning tách giọng khỏi tiếng ồn nền.",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1706561441108-8d4be241fdc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=700", // Found generic clear call image
      },
      {
        title: "Tìm Kiếm Chính Xác",
        subtitle: "Không bao giờ mất",
        description: "Chip U1 với Ultra Wideband định vị AirPods.",
        imageUrl:
          "https://images.unsplash.com/photo-1516163109866-e9d98630a0a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=700", // Found generic location/map image
      },
      {
        title: "Thiết Bị Nghe",
        subtitle: "Sức khỏe thính giác",
        description: "FDA phê duyệt hỗ trợ thính giác cá nhân hóa.",
        imageUrl:
          "https://images.unsplash.com/photo-1659943063471-2fcc8b45edd2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=700", // Found generic ear/hearing image
      },
    ],
  },
  {
    title: "So Sánh AirPods",
    comparisonTable: {
      categories: [
        "Thiết Kế",
        "Âm Thanh",
        "Kiểm Soát Tiếng Ồn",
        "Pin",
        "Chống Nước",
        "Sạc",
      ],
      products: [
        {
          name: "AirPods 4", // Note: This model name might be speculative, original code had no imageUrl
          specs: {
            design: "Thiết kế mở",
            audio: "Âm thanh không gian với theo dõi đầu",
            noiseCancellation: "Không",
            battery: "5 giờ (30 giờ case)",
            waterResistance: "IP54",
            charging: "USB-C",
          },
          // imageUrl: (Add if found/needed)
        },
        {
          name: "AirPods 4 ANC", // Note: This model name might be speculative, original code had no imageUrl
          specs: {
            design: "Thiết kế mở",
            audio: "Âm thanh không gian cá nhân hóa",
            noiseCancellation: "Có (H2 chip)",
            battery: "4 giờ với ANC (20 giờ case)",
            waterResistance: "IP54",
            charging: "USB-C, Qi",
          },
          // imageUrl: (Add if found/needed)
        },
        {
          name: "AirPods Pro (2nd gen)", // Original code had no imageUrl
          specs: {
            design: "In-ear với đầu silicon",
            audio: "Âm thanh thích ứng, Không gian cá nhân hóa",
            noiseCancellation: "Có thế hệ 2",
            battery: "6 giờ (30 giờ case)",
            waterResistance: "IP54",
            charging: "USB-C, MagSafe, Qi",
          },
          // imageUrl: (Add if found/needed)
        },
        {
          name: "AirPods Max", // Original code had no imageUrl
          specs: {
            design: "Over-ear, đệm memory foam",
            audio: "Driver 40mm, Âm thanh Hi-Fi",
            noiseCancellation: "Có chuyên nghiệp",
            battery: "20 giờ",
            waterResistance: "Không",
            charging: "USB-C",
          },
          // imageUrl: (Add if found/needed)
        },
      ],
    },
  },
  {
    title: "Tại Sao Chọn AirPods",
    whyAirPodsCards: [
      // These did not have imageUrl initially
      {
        icon: "magic_audio",
        title: "Thiết Lập Ngay Lập Tức",
        description: "Ghép đôi ngay với thiết bị Apple Account.",
      },
      {
        icon: "seamless_switch",
        title: "Chuyển Đổi Tự Động",
        description: "Chuyển giữa iPhone, iPad, Mac, Apple Watch.",
      },
      {
        icon: "audio_sharing",
        title: "Chia Sẻ Âm Thanh",
        description: "Chia sẻ nhạc với bạn bè bằng cách đưa AirPods gần.",
      },
      {
        icon: "siri_voice",
        title: "Hey Siri",
        description: "Điều khiển bằng giọng nói mà không cần chạm.",
      },
      {
        icon: "long_battery",
        title: "Pin Cả Ngày",
        description: "5-6 giờ sạc, case thêm 20-30 giờ.",
      },
      {
        icon: "premium_sound",
        title: "Âm Thanh Chất Lượng Cao",
        description: "Driver tùy chỉnh Apple cho âm thanh phong phú.",
      },
      {
        icon: "sweat_water",
        title: "Chống Mồ Hôi & Nước",
        description: "IP54 cho tập luyện ngoài trời.",
      },
    ],
  },
  {
    title: "AirPods Và Apple Music",
    musicIntegration: [
      // These did not have imageUrl initially
      {
        title: "Âm Thanh Không Gian",
        description: "Dolby Atmos với hơn 100 triệu bài hát tối ưu.",
        features: ["Dolby Atmos", "Âm thanh vòm 360°", "Theo dõi đầu động"],
      },
      {
        title: "Lossless Audio",
        description: "Chất lượng studio gốc với Lossless/Hi-Res.",
        features: ["24-bit/192 kHz", "ALAC codec", "Chất lượng studio"],
      },
      {
        title: "Âm Thanh Thích Ứng",
        description: "Tự điều chỉnh EQ theo hình dạng tai.",
        features: [
          "Âm thanh tính toán",
          "Equalizer thích ứng",
          "Tối ưu cá nhân",
        ],
      },
    ],
  },
  {
    title: "AirPods Cho Mọi Hoạt Động",
    lifestyleUseCases: [
      {
        scenario: "Tập Luyện",
        title: "Người Bạn Thể Thao",
        description: "IP54 chống mồ hôi, âm thanh thích ứng di chuyển.",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1664301740566-63601165f325?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=700", // Replaced
      },
      {
        scenario: "Làm Việc",
        title: "Tập Trung Tối Đa",
        description: "Chống ồn loại bỏ tiếng văn phòng, mic cho họp video.",
        imageUrl:
          "https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWlycG9kcyUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=80&w=800", // Replaced
      },
      {
        scenario: "Giải Trí",
        title: "Đắm Chìm Âm Nhạc",
        description: "Dolby Atmos, xem phim như rạp.",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1661682988677-2a91d54bb6e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600", // Replaced
      },
      {
        scenario: "Di Chuyển",
        title: "Yên Tĩnh Trên Đường",
        description: "Chống ồn cho chuyến bay hoặc tàu đông.",
        imageUrl:
          "https://images.unsplash.com/photo-1725949889141-986a864acb6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQwfHxhaXJwb2RzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", // Replaced
      },
    ],
  },
];
