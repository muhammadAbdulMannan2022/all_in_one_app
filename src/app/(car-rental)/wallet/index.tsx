import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Transaction {
  id: string;
  type: "payout" | "withdrawal";
  title: string;
  subtitle: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

export default function CarRentalWallet() {
  const router = useRouter();

  // Views: "home" | "transactions" | "withdraw" | "success"
  const [activeView, setActiveView] = useState<"home" | "transactions" | "withdraw" | "success">("home");

  // Withdrawal States
  const [withdrawAmount, setWithdrawAmount] = useState("3450.00");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const transactions: Transaction[] = [
    {
      id: "TXN-80921",
      type: "payout",
      title: "Rental Earnings",
      subtitle: "Toyota Camry booking #BK-8942",
      date: "May 18, 2026 2:30 PM",
      amount: "+$720.00",
      isPositive: true,
    },
    {
      id: "TXN-76123",
      type: "withdrawal",
      title: "Payout to Card",
      subtitle: "Visa **** 4321",
      date: "May 18, 2026 1:15 PM",
      amount: "-$1,500.00",
      isPositive: false,
    },
    {
      id: "TXN-71283",
      type: "payout",
      title: "Rental Earnings",
      subtitle: "Hyundai Elantra booking #BK-4321",
      date: "May 17, 2026 6:45 PM",
      amount: "+$355.00",
      isPositive: true,
    },
    {
      id: "TXN-69102",
      type: "payout",
      title: "Rental Earnings",
      subtitle: "Nissan Rogue booking #BK-5521",
      date: "May 15, 2026 11:20 AM",
      amount: "+$1,235.00",
      isPositive: true,
    },
    {
      id: "TXN-55019",
      type: "withdrawal",
      title: "Payout to Card",
      subtitle: "Visa **** 4321",
      date: "May 12, 2026 10:00 AM",
      amount: "-$950.00",
      isPositive: false,
    },
  ];

  const chartData = [
    { day: "Sat", val: 35 },
    { day: "Sun", val: 65 },
    { day: "Mon", val: 45 },
    { day: "Tue", val: 80 },
    { day: "Wed", val: 55 },
    { day: "Thu", val: 95 },
    { day: "Fri", val: 85 },
  ];

  const handleWithdrawalSubmit = () => {
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to withdraw.");
      return;
    }
    if (amountNum > 3450.00) {
      Alert.alert("Insufficient Balance", "You cannot withdraw more than your available balance.");
      return;
    }
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      Alert.alert("Missing Details", "Please fill in all credit card details.");
      return;
    }
    setActiveView("success");
  };

  const handleCopyToClipboard = () => {
    Alert.alert("Copied", "Transaction ID TXN-FLT80219 copied to clipboard!");
  };

  const handleDownloadReceipt = () => {
    Alert.alert("Receipt Saved", "The transaction PDF receipt has been saved to your downloads.");
  };

  const calculateFees = () => {
    const amt = parseFloat(withdrawAmount) || 0;
    const fee = amt * 0.025; // 2.5% fee
    const receive = Math.max(0, amt - fee);
    return {
      fee: fee.toFixed(2),
      receive: receive.toFixed(2),
    };
  };

  const fees = calculateFees();

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      {/* -------------------- WALLET HOME SCREEN -------------------- */}
      {activeView === "home" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => router.replace("/(car-rental)/dashboard" as any)}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Fleet Wallet</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Available Balance Card */}
            <View className="bg-brand-orange p-6 rounded-3xl shadow-lg shadow-brand-orange/25 mb-6 relative overflow-hidden">
              <View className="absolute right-[-10px] bottom-[-20px] w-36 h-36 rounded-full bg-white/5" />
              <View className="absolute right-[40px] top-[-30px] w-24 h-24 rounded-full bg-white/5" />

              <Text className="text-white/80 text-xs font-bold mb-1">Available Fleet Balance</Text>
              <Text className="text-white text-3xl font-extrabold mb-6">
                $3,450.00 <Text className="text-xs font-semibold">USD</Text>
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setWithdrawAmount("3450.00");
                  setActiveView("withdraw");
                }}
                className="bg-white/10 border border-white/20 rounded-2xl py-3 flex-row items-center justify-center gap-2"
              >
                <Ionicons name="card-outline" size={16} color="white" />
                <Text className="text-white text-xs font-bold">Ready to withdraw</Text>
              </TouchableOpacity>
            </View>

            {/* Weekly Earning Growth Section with Area Chart */}
            <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-6">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-brand-dark text-sm font-bold">Earning Growth</Text>
                <TouchableOpacity className="flex-row items-center gap-1 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                  <Text className="text-brand-gray text-[10px] font-bold">This Week</Text>
                  <Ionicons name="chevron-down" size={12} color="#6A7282" />
                </TouchableOpacity>
              </View>

              {/* Custom View Chart (No External Dependencies) */}
              <View className="h-44 flex-row">
                {/* Y Axis labels */}
                <View className="justify-between h-36 pr-2">
                  <Text className="text-[9px] text-brand-gray font-semibold">500$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">375$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">250$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">125$</Text>
                  <Text className="text-[9px] text-brand-gray font-semibold">0$</Text>
                </View>

                {/* Plot Area */}
                <View className="flex-1">
                  <View className="h-36 relative border-l border-b border-gray-100 flex-row justify-between px-2 pt-2">
                    {/* Background grid lines */}
                    <View className="absolute top-[25%] left-0 right-0 h-[1px] bg-gray-100" />
                    <View className="absolute top-[50%] left-0 right-0 h-[1px] bg-gray-100" />
                    <View className="absolute top-[75%] left-0 right-0 h-[1px] bg-gray-100" />

                    {chartData.map((item, idx) => (
                      <View key={idx} className="flex-1 items-center justify-end h-full relative">
                        {/* Earning bar */}
                        <View
                          style={{ height: `${item.val}%` }}
                          className="w-1.5 bg-[#E4792F]/15 rounded-t-full items-center justify-start"
                        >
                          {/* Dot marker */}
                          <View className="w-3 h-3 rounded-full bg-[#E4792F] border-2 border-white -mt-0.5 shadow" />
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* X Axis days */}
                  <View className="flex-row justify-between pt-2 px-2">
                    {chartData.map((item) => (
                      <Text key={item.day} className="text-[9px] text-brand-gray font-semibold w-7 text-center">
                        {item.day}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Recent Transactions Panel */}
            <View className="mb-12">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-brand-dark text-sm font-bold">Recent Transactions</Text>
                <TouchableOpacity onPress={() => setActiveView("transactions")}>
                  <Text className="text-brand-orange text-xs font-bold">View All</Text>
                </TouchableOpacity>
              </View>

              {/* Transactions lists */}
              <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden px-4">
                {transactions.slice(0, 3).map((item, idx) => (
                  <View
                    key={item.id}
                    className={`flex-row py-4 items-center justify-between ${
                      idx < 2 ? "border-b border-slate-50" : ""
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`w-9 h-9 rounded-xl items-center justify-center ${
                          item.isPositive ? "bg-emerald-50" : "bg-slate-50"
                        }`}
                      >
                        <Ionicons
                          name={item.isPositive ? "car" : "card-outline"}
                          size={16}
                          color={item.isPositive ? "#10B981" : "#6A7282"}
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-brand-dark text-xs font-bold" numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text className="text-brand-gray text-[9px] font-semibold mt-0.5" numberOfLines={1}>
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>
                    <View className="items-end ml-2">
                      <Text
                        className={`text-xs font-bold ${
                          item.isPositive ? "text-emerald-500" : "text-brand-dark"
                        }`}
                      >
                        {item.amount}
                      </Text>
                      <Text className="text-slate-400 text-[8px] font-semibold mt-0.5">
                        {item.date.split(" ")[0]} {item.date.split(" ")[1]}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- TRANSACTION HISTORY SCREEN -------------------- */}
      {activeView === "transactions" && (
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("home")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Transactions History</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden px-4 mb-12">
              {transactions.map((item, idx) => (
                <View
                  key={item.id}
                  className={`flex-row py-4 items-center justify-between ${
                    idx < transactions.length - 1 ? "border-b border-slate-50" : ""
                  }`}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <View
                      className={`w-9 h-9 rounded-xl items-center justify-center ${
                        item.isPositive ? "bg-emerald-50" : "bg-slate-50"
                      }`}
                    >
                      <Ionicons
                        name={item.isPositive ? "car" : "card-outline"}
                        size={16}
                        color={item.isPositive ? "#10B981" : "#6A7282"}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-brand-dark text-xs font-bold" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text className="text-brand-gray text-[9px] font-semibold mt-0.5" numberOfLines={1}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end ml-2">
                    <Text
                      className={`text-xs font-bold ${
                        item.isPositive ? "text-emerald-500" : "text-brand-dark"
                      }`}
                    >
                      {item.amount}
                    </Text>
                    <Text className="text-slate-400 text-[8px] font-semibold mt-0.5">
                      {item.date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- WITHDRAW FUNDS SCREEN -------------------- */}
      {activeView === "withdraw" && (
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <TouchableOpacity onPress={() => setActiveView("home")}>
              <Ionicons name="chevron-back" size={24} color="#2E2E2D" />
            </TouchableOpacity>
            <Text className="text-brand-dark text-base font-bold">Withdraw Funds</Text>
            <View className="w-6" />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Balance Card panel */}
            <View className="bg-slate-50 rounded-3xl p-5 border border-slate-100 shadow-sm items-center justify-center mb-6">
              <Text className="text-brand-gray text-[10px] font-bold">Available Fleet Balance</Text>
              <Text className="text-brand-dark text-3xl font-extrabold mt-1">$3,450.00</Text>
            </View>

            {/* Calculations Panel */}
            <View className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm mb-6 gap-3.5">
              <View className="flex-row justify-between items-center">
                <Text className="text-brand-gray text-xs font-semibold">Withdrawal Amount</Text>
                <TextInput
                  value={withdrawAmount}
                  onChangeText={setWithdrawAmount}
                  keyboardType="numeric"
                  className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-brand-dark text-xs font-bold w-28 text-right"
                />
              </View>

              <View className="flex-row justify-between items-center border-b border-slate-50 pb-3.5">
                <Text className="text-brand-gray text-xs font-semibold">Processing Fee (2.5%)</Text>
                <Text className="text-brand-dark text-xs font-bold">-${fees.fee}</Text>
              </View>

              <View className="flex-row justify-between items-center pt-2">
                <Text className="text-brand-dark text-xs font-bold">Total You'll receive</Text>
                <Text className="text-brand-orange text-sm font-extrabold">${fees.receive}</Text>
              </View>
            </View>

            {/* Credit Card Input Form */}
            <View className="gap-4 mb-12">
              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Card Number</Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="Enter 16-digit card number"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="numeric"
                  maxLength={16}
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                  <Text className="text-xs font-bold text-brand-dark mb-1.5">Expiry Date</Text>
                  <TextInput
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="MM/YY"
                    placeholderTextColor="#A0AEC0"
                    maxLength={5}
                    className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                  />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-xs font-bold text-brand-dark mb-1.5">CVV</Text>
                  <TextInput
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="CVV"
                    placeholderTextColor="#A0AEC0"
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={3}
                    className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                  />
                </View>
              </View>

              <View className="gap-1.5">
                <Text className="text-xs font-bold text-brand-dark mb-1.5">Cardholder Name</Text>
                <TextInput
                  value={cardholderName}
                  onChangeText={setCardholderName}
                  placeholder="Enter cardholder name"
                  placeholderTextColor="#A0AEC0"
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-brand-dark text-sm"
                />
              </View>

              {/* Confirm submit withdrawal button */}
              <TouchableOpacity
                onPress={handleWithdrawalSubmit}
                className="w-full py-4 bg-brand-orange rounded-2xl items-center justify-center mt-4 shadow"
              >
                <Text className="text-white text-base font-bold">Confirm Withdrawal</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* -------------------- WITHDRAW SUCCESS SCREEN -------------------- */}
      {activeView === "success" && (
        <View className="flex-1 bg-white">
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-6">
            {/* Top Visual success checkmark */}
            <View className="items-center justify-center pt-8 pb-10">
              <View className="w-40 h-40 bg-orange-50 rounded-full items-center justify-center mb-6">
                <Ionicons name="checkmark-circle" size={80} color="#E4792F" />
              </View>
            </View>

            {/* Success details */}
            <Text className="text-brand-dark text-xl font-bold text-center mb-2">
              Withdrawal Requested
            </Text>
            <Text className="text-brand-gray text-xs text-center px-6 leading-5 mb-8">
              We are processing your request. You will receive an SMS and push notification once completed.
            </Text>

            {/* Details Card */}
            <View className="bg-slate-50 border border-slate-100 rounded-3xl p-5 mb-8 gap-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-brand-gray text-[10px] font-bold">Transaction ID</Text>
                <TouchableOpacity onPress={handleCopyToClipboard} className="flex-row items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-xl">
                  <Text className="text-brand-dark text-[10px] font-bold">TXN-FLT80219</Text>
                  <Ionicons name="copy-outline" size={10} color="#6A7282" />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center justify-between border-t border-slate-100 pt-4">
                <Text className="text-brand-gray text-[10px] font-bold">Amount Withdrawn</Text>
                <Text className="text-brand-dark text-[10px] font-bold">${withdrawAmount} USD</Text>
              </View>

              <View className="flex-row items-center justify-between border-t border-slate-100 pt-4">
                <Text className="text-brand-gray text-[10px] font-bold">Date & Time</Text>
                <Text className="text-brand-dark text-[10px] font-semibold">June 17, 2026 at 11:15 AM</Text>
              </View>

              <View className="flex-row items-center justify-between border-t border-slate-100 pt-4">
                <Text className="text-brand-gray text-[10px] font-bold">Status</Text>
                <View className="bg-[#E4792F]/10 px-2 py-0.5 rounded">
                  <Text className="text-brand-orange text-[10px] font-bold">Processing</Text>
                </View>
              </View>
            </View>

            {/* Download Receipt Button */}
            <TouchableOpacity
              onPress={handleDownloadReceipt}
              className="w-full py-4 border border-brand-orange rounded-2xl flex-row items-center justify-center gap-2 mb-4"
            >
              <Ionicons name="download-outline" size={16} color="#E4792F" />
              <Text className="text-brand-orange text-xs font-bold">Download Receipt</Text>
            </TouchableOpacity>

            {/* Back to Home Button */}
            <TouchableOpacity
              onPress={() => {
                setCardNumber("");
                setExpiryDate("");
                setCvv("");
                setCardholderName("");
                setActiveView("home");
              }}
              className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center mb-12"
            >
              <Text className="text-brand-dark text-xs font-bold">Back to Wallet</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
