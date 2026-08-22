import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {api} from '../../services/api';
import {UserStats, AdminAuditLog} from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

const fetchDashboardStats = async (): Promise<UserStats> => {
  const response = await api.get('/admin/dashboard');
  return response.data.data as UserStats;
};

const fetchAuditLogs = async (): Promise<AdminAuditLog[]> => {
  const response = await api.get('/admin/audit-logs');
  return response.data.data || [];
};

type TabType = 'dashboard' | 'users' | 'posts' | 'audit';

const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const {data: stats, isLoading: statsLoading, refetch} = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchDashboardStats,
  });

  const {data: auditLogs = [], isLoading: logsLoading} = useQuery({
    queryKey: ['auditLogs'],
    queryFn: fetchAuditLogs,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderStatCard = (label: string, value: number | string, icon: string) => (
    <View style={styles.statCard}>
      <View style={styles.statIconContainer}>
        <Icon name={icon} size={24} color="#6366f1" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderTabButton = (tab: TabType, label: string) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
      onPress={() => setActiveTab(tab)}>
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tab && styles.tabButtonTextActive,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (statsLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}>
        {renderTabButton('dashboard', 'Dashboard')}
        {renderTabButton('users', 'Users')}
        {renderTabButton('posts', 'Posts')}
        {renderTabButton('audit', 'Audit Logs')}
      </ScrollView>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetch} tintColor="#6366f1" />
        }
        contentContainerStyle={styles.content}>
        {activeTab === 'dashboard' && stats && (
          <View>
            <View style={styles.statsGrid}>
              {renderStatCard('Total Users', stats.total_users, 'people')}
              {renderStatCard('Total Posts', stats.total_posts, 'document-text')}
              {renderStatCard('Total Comments', stats.total_comments, 'chatbubble')}
              {renderStatCard('Total Likes', stats.total_likes, 'heart')}
              {renderStatCard('Active Today', stats.active_users_today, 'time')}
              {renderStatCard('New Today', stats.new_users_today, 'person-add')}
            </View>
          </View>
        )}

        {activeTab === 'users' && (
          <View style={styles.placeholderContainer}>
            <Icon name="people-outline" size={48} color="#d1d5db" />
            <Text style={styles.placeholderText}>User management coming soon</Text>
            <Text style={styles.placeholderSubtext}>
              You can view, suspend, and manage users from the backend API
            </Text>
          </View>
        )}

        {activeTab === 'posts' && (
          <View style={styles.placeholderContainer}>
            <Icon name="document-text-outline" size={48} color="#d1d5db" />
            <Text style={styles.placeholderText}>Post management coming soon</Text>
            <Text style={styles.placeholderSubtext}>
              You can review and moderate posts from the backend API
            </Text>
          </View>
        )}

        {activeTab === 'audit' && (
          <View>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {logsLoading ? (
              <ActivityIndicator size="large" color="#6366f1" style={{marginTop: 24}} />
            ) : (
              auditLogs.map(log => (
                <View key={log.log_id} style={styles.auditItem}>
                  <View style={styles.auditHeader}>
                    <Text style={styles.auditAction}>{log.action}</Text>
                    <Text style={styles.auditDate}>{formatDate(log.created_at)}</Text>
                  </View>
                  <Text style={styles.auditDetails}>
                    Target: {log.target_type} / {log.target_id}
                  </Text>
                  <Text style={styles.auditActor}>By: @{log.actor_username}</Text>
                </View>
              ))
            )}
            {auditLogs.length === 0 && !logsLoading && (
              <View style={styles.emptyContainer}>
                <Icon name="list-outline" size={48} color="#d1d5db" />
                <Text style={styles.emptyText}>No audit logs yet</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  tabsContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  tabButtonActive: {
    backgroundColor: '#6366f1',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  tabButtonTextActive: {
    color: '#ffffff',
  },
  content: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  auditItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  auditAction: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  auditDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  auditDetails: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  auditActor: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '500',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 12,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 12,
  },
});

export default AdminScreen;
