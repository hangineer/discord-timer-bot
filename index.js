import "dotenv/config";
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";

const client = new Client({
	intents: [GatewayIntentBits.Guilds]
});

// 使用斜線指令 (/timer [分鐘] [事項])
const commands = [
	new SlashCommandBuilder()
		.setName("timer")
		.setDescription("設定一個倒數計時器")
		.addIntegerOption(option =>
			option.setName("minutes")
				.setDescription("請填寫倒數時間(分鐘)")
				.setRequired(true))
		.addStringOption(option =>
			option.setName("title")
				.setDescription("輕填寫倒數標題")
				.setRequired(false))
]
	.map(command => command.toJSON());

// 註冊指令
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log("正在刷新指令...");
		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);
		console.log("指令刷新成功");
	} catch (error) {
		console.error(error);
	}
})();

client.once("ready", () => {
	console.log(`已登入為 ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === "timer") {
		const minutes = interaction.options.getInteger("minutes");
		const title = interaction.options.getString("title") || "計時結束";

		const durationInMs = minutes * 60 * 1000;
		const endTime = Date.now() + durationInMs;

		// 轉換為 Unix Timestamp (秒)，這是 Discord 需要的格式
		const endTimestamp = Math.floor(endTime / 1000);

		// 使用 Discord 的相對時間語法 <t:時間戳:R> 顯示 "剩餘 xx 分鐘" 或 "剩餘 xx 秒"
		await interaction.reply({
			content: `⏳ **${title}** 開始倒數！\n將在 <t:${endTimestamp}:R> 結束`,
		});

		// 設定 JavaScript 的計時器，時間到後發送提醒
		setTimeout(async () => {
			try {
				// 發送一個新的後續訊息提醒用戶，並提及該用戶
				await interaction.followUp({
					content: `🔔 <@${interaction.user.id}> 逼逼時間到！\n**${title}** 已經結束囉！`,
				});
			} catch (error) {
				console.error("發送提醒失敗:", error);
			}
		}, durationInMs);
	}
});

client.login(process.env.DISCORD_TOKEN);
