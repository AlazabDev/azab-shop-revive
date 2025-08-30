import { useState, useMemo } from "react";
import { useMaintenanceRequests } from "@/hooks/useMaintenanceRequests";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Calendar, Phone, DollarSign, Plus, MapPin } from "lucide-react";
import { MaintenanceRequestDetails } from "./MaintenanceRequestDetails";
import { MaintenanceRequestActions } from "./MaintenanceRequestActions";
import { MaintenanceFilters } from "./MaintenanceFilters";
import { MaintenanceExport } from "./MaintenanceExport";
import { MaintenanceStats } from "../dashboard/MaintenanceStats";

interface MaintenanceRequestsListProps {
  onNewRequestClick?: () => void;
}

export function MaintenanceRequestsList({ onNewRequestClick }: MaintenanceRequestsListProps) {
  const { requests, loading, error } = useMaintenanceRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState<Date | undefined>();
  const [dateToFilter, setDateToFilter] = useState<Date | undefined>();
  const [minCostFilter, setMinCostFilter] = useState("");
  const [maxCostFilter, setMaxCostFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = useMemo(() => {
    return requests?.filter(request => {
      const matchesSearch = request.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.client_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
      const matchesServiceType = serviceTypeFilter === "all" || request.service_type === serviceTypeFilter;
      const matchesLocation = !locationFilter || request.location?.toLowerCase().includes(locationFilter.toLowerCase());
      
      const requestDate = new Date(request.created_at);
      const matchesDateFrom = !dateFromFilter || requestDate >= dateFromFilter;
      const matchesDateTo = !dateToFilter || requestDate <= dateToFilter;
      
      const cost = request.actual_cost || request.estimated_cost || 0;
      const matchesMinCost = !minCostFilter || cost >= parseFloat(minCostFilter);
      const matchesMaxCost = !maxCostFilter || cost <= parseFloat(maxCostFilter);
      
      const matchesRating = ratingFilter === "all" || !request.rating || request.rating >= parseInt(ratingFilter);
      
      return matchesSearch && matchesStatus && matchesPriority && matchesServiceType && 
             matchesLocation && matchesDateFrom && matchesDateTo && matchesMinCost && 
             matchesMaxCost && matchesRating;
    }) || [];
  }, [requests, searchTerm, statusFilter, priorityFilter, serviceTypeFilter, locationFilter, 
      dateFromFilter, dateToFilter, minCostFilter, maxCostFilter, ratingFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setServiceTypeFilter("all");
    setLocationFilter("");
    setDateFromFilter(undefined);
    setDateToFilter(undefined);
    setMinCostFilter("");
    setMaxCostFilter("");
    setRatingFilter("all");
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: "status-pending",
      in_progress: "status-in-progress",
      completed: "status-completed",
      cancelled: "status-cancelled"
    };

    const labels = {
      pending: "في الانتظار",
      in_progress: "قيد التنفيذ", 
      completed: "مكتمل",
      cancelled: "ملغي"
    };

    return (
      <Badge variant="outline" className={statusClasses[status] || statusClasses.pending}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      low: "bg-muted text-muted-foreground border-muted",
      medium: "bg-warning/10 text-warning border-warning/20",
      high: "bg-destructive/10 text-destructive border-destructive/20"
    };

    const labels = {
      low: "منخفضة",
      medium: "متوسطة",
      high: "عالية"
    };

    return (
      <Badge variant="outline" className={priorityClasses[priority] || priorityClasses.medium}>
        {labels[priority] || priority}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">جاري تحميل الطلبات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-center text-destructive">خطأ في تحميل الطلبات: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            إدارة طلبات الصيانة
          </h2>
          <p className="text-muted-foreground mt-1">
            إدارة ومتابعة جميع طلبات الصيانة مع تحليلات شاملة
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <MaintenanceExport 
            requests={requests || []} 
            filteredRequests={filteredRequests}
          />
          <Button 
            className="gap-2 bg-gradient-primary" 
            onClick={onNewRequestClick}
          >
            <Plus className="h-4 w-4" />
            طلب صيانة جديد
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              المعروض: {filteredRequests.length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              المجموع: {requests?.length || 0}
            </Badge>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <MaintenanceStats />

      {/* Advanced Filters */}
      <MaintenanceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        serviceTypeFilter={serviceTypeFilter}
        setServiceTypeFilter={setServiceTypeFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        dateFromFilter={dateFromFilter}
        setDateFromFilter={setDateFromFilter}
        dateToFilter={dateToFilter}
        setDateToFilter={setDateToFilter}
        minCostFilter={minCostFilter}
        setMinCostFilter={setMinCostFilter}
        maxCostFilter={maxCostFilter}
        setMaxCostFilter={setMaxCostFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        onClearFilters={clearFilters}
        filteredCount={filteredRequests.length}
        totalCount={requests?.length || 0}
      />

      {/* Requests Table */}
      <Card className="card-elegant">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">قائمة طلبات الصيانة</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right font-semibold">رقم الطلب</TableHead>
                  <TableHead className="text-right font-semibold">التفاصيل</TableHead>
                  <TableHead className="text-right font-semibold">العميل</TableHead>
                  <TableHead className="text-right font-semibold">الخدمة</TableHead>
                  <TableHead className="text-right font-semibold">الحالة</TableHead>
                  <TableHead className="text-right font-semibold">الأولوية</TableHead>
                  <TableHead className="text-right font-semibold">التوقيت والتكلفة</TableHead>
                  <TableHead className="text-right font-semibold">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests?.map((request) => (
                  <TableRow key={request.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-mono text-sm font-medium">
                      <Badge variant="outline" className="font-mono">
                        #{request.id.slice(0, 8)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 max-w-xs">
                        <p className="font-semibold text-foreground leading-tight">
                          {request.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {request.description}
                        </p>
                        {request.location && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {request.location}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <p className="font-medium text-foreground">{request.client_name}</p>
                        {request.client_phone && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {request.client_phone}
                          </div>
                        )}
                        {request.client_email && (
                          <div className="text-xs text-muted-foreground truncate max-w-32">
                            {request.client_email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {request.service_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(request.status)}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(request.priority)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 min-w-32">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">
                            {new Date(request.created_at).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                        {(request.estimated_cost || request.actual_cost) && (
                          <div className="flex items-center gap-1 text-xs">
                            <DollarSign className="h-3 w-3 text-success" />
                            <span className="font-medium text-success">
                              {(request.actual_cost || request.estimated_cost)?.toLocaleString()} ج.م
                            </span>
                          </div>
                        )}
                        {request.rating && (
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-warning">⭐</span>
                            <span className="font-medium">{request.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                              className="hover:bg-primary/10"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl">
                                تفاصيل طلب الصيانة #{request.id.slice(0, 8)}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedRequest && (
                              <MaintenanceRequestDetails request={selectedRequest} />
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <MaintenanceRequestActions request={request} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>

            {(!filteredRequests || filteredRequests.length === 0) && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center">
                  <div className="space-y-3">
                    <div className="text-4xl opacity-50">📋</div>
                    <p className="text-muted-foreground">
                      {requests?.length === 0 
                        ? "لا توجد طلبات صيانة بعد" 
                        : "لا توجد طلبات مطابقة للبحث والفلاتر المحددة"
                      }
                    </p>
                    {filteredRequests.length === 0 && requests?.length > 0 && (
                      <Button variant="outline" onClick={clearFilters} className="mt-3">
                        مسح جميع الفلاتر
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}