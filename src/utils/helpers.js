// STEP 1：匯入日出日落資料
import sunriseAndSunsetData from './sunrise-sunset.json';

export const getMoment = (locationName) => {
  // STEP 2：從日出日落時間中找出符合的地區
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName
  );

  // STEP 3：找不到的話則拋出錯誤訊息
  if (!location) {
    throw new Error(`找不到 ${location} 的日出日落資料`);
  }

  // STEP 4：取得當前時間
  const now = new Date();

  // STEP 5：將當前時間以 "2019-10-08" 的時間格式呈現
  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-');

  // STEP 6：從該地區中找到對應的日期
  const locationDate = location?.time.find((time) => time.dataTime === nowDate);

  // STEP 7：找不到的話則拋出錯誤訊息
  if (!locationDate) {
    throw new Error(`找不到 ${locationName} 在 ${nowDate} 的日出日落資料`);
  }

  // STEP 8：將日出日落以及當前時間轉成時間戳記（TimeStamp）
  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).getTime();
  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).getTime();
  const nowTimeStamp = now.getTime();

  // STEP 9：若當前時間介於日出和日落中間，則表示為白天，否則為晚上
  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? 'day'
    : 'night';
};

export const availableLocations = [
    {
      cityName: '宜蘭縣',
      locationName: '宜蘭',
      sunriseCityName: '宜蘭縣',
    },
    {
      cityName: '嘉義市',
      locationName: '嘉義',
      sunriseCityName: '嘉義市',
    },
    {
      cityName: '屏東縣',
      locationName: '恆春',
      sunriseCityName: '屏東縣',
    },
    {
      cityName: '苗栗縣',
      locationName: '國一S114K', // 銅鑼鄉
      sunriseCityName: '苗栗縣',
    },
    {
      cityName: '雲林縣',
      locationName: '國一N234K',
      sunriseCityName: '雲林縣',
    },
    {
      cityName: '臺東縣',
      locationName: '臺東',
      sunriseCityName: '臺東縣',
    },
    {
      cityName: '臺北市',
      locationName: '臺北',
      sunriseCityName: '臺北市',
    },
    {
      cityName: '金門縣',
      locationName: '金門',
      sunriseCityName: '金門縣',
    },
    {
      cityName: '桃園市',
      locationName: '新屋',
      sunriseCityName: '桃園市',
    },
    {
      cityName: '彰化縣',
      locationName: '彰師大',
      sunriseCityName: '彰化縣',
    },
    {
      cityName: '嘉義縣',
      locationName: '國一N250K', // 大林鎮
      sunriseCityName: '嘉義縣',
    },
    {
      cityName: '高雄市',
      locationName: '高雄',
      sunriseCityName: '高雄市',
    },
    {
      cityName: '基隆市',
      locationName: '基隆',
      sunriseCityName: '基隆市',
    },
    {
      cityName: '臺南市',
      locationName: '南區中心',
      sunriseCityName: '臺南市',
    },
    {
      cityName: '南投縣',
      locationName: '日月潭',
      sunriseCityName: '南投縣',
    },
    {
      cityName: '臺中市',
      locationName: '臺中',
      sunriseCityName: '臺中市',
    },
    {
      cityName: '新竹縣',
      locationName: '新竹',
      sunriseCityName: '新竹縣',
    },
    {
      cityName: '花蓮縣',
      locationName: '花蓮',
      sunriseCityName: '花蓮縣',
    },
    {
      cityName: '連江縣',
      locationName: '馬祖',
      sunriseCityName: '連江縣',
    },
    {
      cityName: '澎湖縣',
      locationName: '澎湖',
      sunriseCityName: '澎湖縣',
    },
    {
      cityName: '新北市',
      locationName: '板橋',
      sunriseCityName: '新北市',
    },
  ];

export const findLocation=(cityName)=>{
    return availableLocations.find(location=>location.cityName === cityName);
};