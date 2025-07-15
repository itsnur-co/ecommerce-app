import { useQuery } from "@apollo/client";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { COLORS, SPACING } from "../../constants/theme";
import { useAuthForm } from "../../hooks/useAuthForm";
import { GET_MY_ORDERS } from "../../queries/order";
import Card from "../shared/Card";
import CenteredView from "../shared/CenteredView";

export default function AccountForm() {
  const {
    isLogin,
    setIsLogin,
    form,
    error,
    success,
    user,
    loginLoading,
    signupLoading,
    handleInput,
    handleLogin,
    handleSignup,
    handleLogout,
    setError,
    setSuccess,
  } = useAuthForm();

  // Always call the hook, but skip if not logged in
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useQuery(GET_MY_ORDERS, { skip: !user });
  const orders = ordersData?.customer?.orders?.nodes || [];

  if (user) {
    return (
      <CenteredView>
        <Card>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Welcome, {user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.sectionTitle}>Your Orders</Text>
          {ordersLoading ? (
            <Text style={styles.sectionText}>Loading orders...</Text>
          ) : ordersError ? (
            <Text style={styles.sectionText}>Failed to load orders.</Text>
          ) : orders.length === 0 ? (
            <Text style={styles.sectionText}>No orders found.</Text>
          ) : (
            orders.map((order: any) => (
              <Card
                key={order.id}
                style={{ marginVertical: 8, backgroundColor: "#f7f7f7" }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Order #{order.orderNumber}
                </Text>
                <Text>Date: {new Date(order.date).toLocaleDateString()}</Text>
                <Text>Status: {order.status}</Text>
                <Text>Total: €{order.total}</Text>
                <Text>Items:</Text>
                {order.lineItems.nodes.map((item: any, idx: number) => (
                  <Text key={idx} style={{ marginLeft: 8 }}>
                    {item.product?.node?.name} x{item.quantity} - €{item.total}
                  </Text>
                ))}
              </Card>
            ))
          )}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </Card>
      </CenteredView>
    );
  }

  return (
    <CenteredView>
      <Card>
        <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
        {!isLogin && (
          <TextInput
            placeholder="Name"
            value={form.name}
            onChangeText={(v) => handleInput("name", v)}
            style={styles.input}
            autoCapitalize="words"
          />
        )}
        <TextInput
          placeholder="Username"
          value={form.username}
          onChangeText={(v) => handleInput("username", v)}
          style={styles.input}
          autoCapitalize="none"
        />
        {!isLogin && (
          <TextInput
            placeholder="Email"
            value={form.email}
            onChangeText={(v) => handleInput("email", v)}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(v) => handleInput("password", v)}
          style={styles.input}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}
        <TouchableOpacity
          onPress={isLogin ? handleLogin : handleSignup}
          style={styles.primaryBtn}
          disabled={loginLoading || signupLoading}
        >
          <Text style={styles.primaryBtnText}>
            {isLogin
              ? loginLoading
                ? "Logging in..."
                : "Login"
              : signupLoading
              ? "Signing up..."
              : "Sign Up"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsLogin(!isLogin);
            setError("");
            setSuccess("");
          }}
          style={{ marginTop: SPACING.md }}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </Card>
    </CenteredView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SPACING.md,
    textAlign: "center",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: SPACING.sm,
    color: COLORS.text,
  },
  email: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: SPACING.xs,
  },
  sectionText: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  logoutBtn: {
    backgroundColor: COLORS.error,
    borderRadius: SPACING.sm,
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
  },
  logoutBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.sm,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  error: {
    color: "red",
    marginTop: SPACING.sm,
    textAlign: "center",
  },
  success: {
    color: "green",
    marginTop: SPACING.sm,
    textAlign: "center",
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.sm,
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  switchText: {
    color: COLORS.accent,
    textAlign: "center",
  },
});
